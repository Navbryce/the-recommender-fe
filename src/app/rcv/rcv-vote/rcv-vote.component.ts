import { Component, Inject, OnInit } from '@angular/core';
import {
  CandidateMetadata,
  ElectionMetadata,
} from '../../data/models/ElectionMetadata.class';
import {
  buildDinnerPartyResultsCmds,
  getOrFetchObjectFromBrowserRoute,
} from '../../shared/utilities/routing';
import { ROUTES } from 'src/routes.const';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BUSINESS_SERVICE_TOKEN,
  RCV_SERVICE_TOKEN,
} from '../../data/services/service-injection-tokens';
import { RCVService } from '../../data/services/RCVService.interface';
import { ElectionStatus } from '../../data/models/ElectionStatus.enum';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { LocalizedBusiness } from '../../data/models/LocalizedBusiness.interface';
import { BusinessService } from '../../data/services/BusinessService.interface';
import { VIEW_CONFIG } from '../../view-config.const';
import { LayoutService } from '../../shared/services/layout.service';
import { animate, style, transition, trigger } from '@angular/animations';
import {
  ElectionEventType,
  StatusEvent,
} from 'src/app/data/models/ElectionEvent.interface';

@Component({
  selector: 'app-rcv-vote',
  templateUrl: './rcv-vote.component.html',
  styleUrls: ['./rcv-vote.component.scss'],
  animations: [
    trigger('businessDetailsAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('200ms', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', height: '100px' }),
        animate('200ms', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})
export class RcvVoteComponent implements OnInit {
  public readonly VIEW_CONFIG = VIEW_CONFIG;
  readonly RANK_BOX_HEIGHT_PX = 100;
  readonly RANK_BOX_VERTICAL_MARGIN_PX = 10;

  public currentElection: ElectionMetadata;
  public candidateOrdering: CandidateMetadata[];
  public selectedCandidate: CandidateMetadata;
  // TODO: Use some sort of caching
  public selectedLocalizedBusiness: LocalizedBusiness;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public layoutService: LayoutService,
    @Inject(BUSINESS_SERVICE_TOKEN) private businessService: BusinessService,
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

  private onNewCurrentElection(election: ElectionMetadata | null) {
    if (election == null) {
      void this.router.navigate(['/']);
      return;
    }
    if (election.electionStatus === ElectionStatus.COMPLETE) {
      void this.router.navigate(buildDinnerPartyResultsCmds(election.id));
      return;
    }
    this.currentElection = election;
    this.rcvService
      .getElectionEventStream(this.currentElection.id)
      .getObservableForEvent<StatusEvent>(ElectionEventType.STATUS_CHANGED)
      .subscribe((event) => {
        if (event.status === ElectionStatus.COMPLETE) {
          void this.router.navigate(buildDinnerPartyResultsCmds(election.id));
        }
      });
    this.candidateOrdering = Object.assign([], election.candidates);
  }

  onCandidateDrop(event: CdkDragDrop<CandidateMetadata[]>) {
    // TODO: Save ordering in browser in case user exits?
    moveItemInArray(
      this.candidateOrdering,
      event.previousIndex,
      event.currentIndex
    );
  }

  onCandidateSelect(candidate: CandidateMetadata) {
    this.selectedCandidate = candidate;
    this.businessService
      .getLocalizedBusiness(candidate.businessId)
      .subscribe((business) => (this.selectedLocalizedBusiness = business));
  }

  onCloseLocalizedBusiness() {
    this.selectedLocalizedBusiness = null;
  }

  async onVote() {
    await this.rcvService
      .vote(
        this.currentElection.id,
        this.candidateOrdering.map((val) => val.businessId)
      )
      .toPromise();
    void this.router.navigate(
      buildDinnerPartyResultsCmds(this.currentElection.id, this.currentElection)
    );
  }
}
