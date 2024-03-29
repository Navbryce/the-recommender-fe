import { Component, Inject, OnInit } from '@angular/core';
import {
  buildDinnerPartyResultsCmds,
  getOrFetchObjectFromBrowserRoute,
} from '../../shared/utilities/routing';
import { ActivatedRoute, Router } from '@angular/router';
import { RCV_SERVICE_TOKEN } from '../../data/services/service-injection-tokens';
import { RCVService } from '../../data/services/RCVService.interface';
import {
  CandidateMetadata,
  ElectionMetadata,
} from '../../data/models/ElectionMetadata.class';
import {
  ElectionEventType,
  VoteCastEvent,
} from '../../data/models/ElectionEvent.interface';
import { ElectionStatus } from '../../data/models/ElectionStatus.enum';
import { ROUTES } from '../../../routes.const';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-rcv-overview',
  templateUrl: './rcv-overview.component.html',
  styleUrls: ['./rcv-overview.component.scss'],
})
export class RcvOverviewComponent implements OnInit {
  public readonly ElectionStatus = ElectionStatus;

  public currentElection: ElectionMetadata;
  public nextStageDisplayStr = '';
  public readonly currentStatusToDisplayString = {
    [ElectionStatus.IN_CREATION]: 'Start voting!',
    [ElectionStatus.VOTING]: 'Get the results!',
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
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
    electionEventSource
      .getObservableForEvent<VoteCastEvent>(ElectionEventType.VOTE_CAST)
      .subscribe((voter) => this.currentElection.addVoter(voter));
  }

  async onMoveToNextStageClick() {
    if (
      this.currentElection.nextStage === ElectionStatus.VOTING &&
      this.currentElection.candidates.length === 0
    ) {
      void this.alertService.warnAlert(
        'No candidates',
        "No restaurants have been added to the election yet. You probably don't want to start voting till your friends have nominated places."
      );
      return;
    }
    return this.updateElectionStatus(this.currentElection.nextStage);
  }

  private async updateElectionStatus(electionStatus: ElectionStatus) {
    await this.rcvService
      .updateElectionState(this.currentElection.id, electionStatus)
      .toPromise();
    this.currentElection.electionStatus = electionStatus;
    if (this.currentElection.electionStatus === ElectionStatus.COMPLETE) {
      void this.router.navigate(
        buildDinnerPartyResultsCmds(
          this.currentElection.id,
          this.currentElection
        )
      );
    }
  }
}
