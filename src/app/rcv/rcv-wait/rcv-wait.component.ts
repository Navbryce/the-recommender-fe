import { Component, Inject, OnInit } from '@angular/core';
import { ElectionMetadata } from '../../data/models/ElectionMetadata.class';
import { getOrFetchObjectFromBrowserRoute } from '../../shared/utilities/routing';
import { ROUTES } from '../../../routes.const';
import { ActivatedRoute, Router } from '@angular/router';
import { RCVService } from '../../data/services/RCVService.interface';
import { RCV_SERVICE_TOKEN } from '../../data/services/service-injection-tokens';
import { ElectionEventType } from '../../data/models/ElectionEvent.interface';
import {
  ElectionResult,
  ElectionResultObject,
} from '../../data/models/ElectionResult.interface';

@Component({
  selector: 'app-rcv-wait',
  templateUrl: './rcv-wait.component.html',
  styleUrls: ['./rcv-wait.component.scss'],
})
export class RcvWaitComponent {
  public election: ElectionMetadata;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(RCV_SERVICE_TOKEN) private rcvService: RCVService
  ) {
    getOrFetchObjectFromBrowserRoute(
      router,
      activatedRoute,
      'id',
      ROUTES.election.payloadField,
      'id',
      (id) => this.rcvService.getElectionMetadata(id)
    )[1].subscribe((election) => this.onNewElection(election));
  }

  private async onNewElection(election: ElectionMetadata) {
    this.election = election;
    // TODO: ADD SANITY CHECK for election status. Maybe combine this with event stream where observable first pipes sanity check value?
    this.rcvService
      .getElectionEventStream(election.id)
      .getObservableForEvent<ElectionResultObject>(
        ElectionEventType.RESULTS_UPDATED
      )
      .subscribe((results) => {
        void this.onNewResults(new ElectionResult(results));
      });
    void this.onNewResults(
      await this.rcvService.getElectionResults(election.id).toPromise()
    );
  }

  private async onNewResults(results: ElectionResult) {
    if (
      this.election.results &&
      results.calculatedAt < this.election.results.calculatedAt
    ) {
      return;
    }
    this.election.setElectionResults(results);
  }
}
