import { Component, Inject } from '@angular/core';
import { ElectionMetadata } from '../../data/models/ElectionMetadata.class';
import { getOrFetchObjectFromBrowserRoute } from '../../shared/utilities/routing';
import { ROUTES } from '../../../routes.const';
import { ActivatedRoute, Router } from '@angular/router';
import { RCVService } from '../../data/services/RCVService.interface';
import { RCV_SERVICE_TOKEN } from '../../data/services/service-injection-tokens';
import {
  ElectionEventType,
  VoteCastEvent,
} from '../../data/models/ElectionEvent.interface';
import {
  ElectionResult,
  ElectionResultObject,
} from '../../data/models/ElectionResult.interface';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-rcv-results-screen',
  templateUrl: './rcv-results-screen.component.html',
  styleUrls: ['./rcv-results-screen.component.scss'],
})
export class RcvResultsScreenComponent {
  public election: ElectionMetadata;
  public votersLog: VoteCastEvent[] = [];

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

    // TODO: move this logic into into the rcv-results components or add electoin results as an input
    const electionEventStream = this.rcvService.getElectionEventStream(
      election.id
    );

    electionEventStream
      .getObservableForEvent<ElectionResultObject>(
        ElectionEventType.RESULTS_UPDATED
      )
      .subscribe((results) => {
        void this.onNewResults(new ElectionResult(results));
      });

    electionEventStream
      .getObservableForEvent<VoteCastEvent>(ElectionEventType.VOTE_CAST)
      .subscribe((vote) => {
        this.votersLog.push(vote);
        setTimeout(() => {
          this.votersLog.pop();
        }, 5000);
      });

    this.rcvService
      .getElectionResults(election.id)
      .pipe(filter((result) => result !== null && result !== undefined))
      .subscribe((result) => this.onNewResults(new ElectionResult(result)));
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
