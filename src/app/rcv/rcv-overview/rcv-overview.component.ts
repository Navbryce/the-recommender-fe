import { Component, Inject, OnInit } from '@angular/core';
import { getOrFetchObjectFromBrowserRoute } from '../../shared/utilities/RouteComponentUtilities';
import { ActivatedRoute, Router } from '@angular/router';
import { RCV_SERVICE_TOKEN } from '../../data/services/service-injection-tokens';
import { RCVService } from '../../data/services/RCVService.interface';
import {
  CandidateMetadata,
  ElectionMetadata,
} from '../../data/models/ElectionMetadata.class';
import { ElectionEventType } from '../../data/models/ElectionEvent.interface';
import { ElectionStatus } from '../../data/models/ElectionStatus.enum';
import { ROUTES } from '../../../routes.const';

@Component({
  selector: 'app-rcv-overview',
  templateUrl: './rcv-overview.component.html',
  styleUrls: ['./rcv-overview.component.scss'],
})
export class RcvOverviewComponent implements OnInit {
  public electionStatusEnum = ElectionStatus;

  public currentElection: ElectionMetadata;

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
    )[1].subscribe((election) => this.onNewCurrentElection(election));
  }

  ngOnInit(): void {}

  private onNewCurrentElection(election: ElectionMetadata) {
    this.currentElection = election;
    const electionEventSource = this.rcvService.getElectionEventStream(
      election.id
    );
    electionEventSource
      .getObservableForEvent<CandidateMetadata>(
        ElectionEventType.CANDIDATE_ADDED
      )
      .subscribe((candidate) =>
        this.currentElection.addCandidateMetadata(candidate)
      );
  }

  async updateElectionStatus(electionStatus: ElectionStatus) {
    await this.rcvService
      .updateElectionState(this.currentElection.id, electionStatus)
      .toPromise();
    this.currentElection.electionStatus = electionStatus;
  }
}
