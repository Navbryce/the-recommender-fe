import { Component, Inject, OnInit } from '@angular/core';
import {
  CandidateMetadata,
  ElectionMetadata,
} from '../../data/models/ElectionMetadata.class';
import { getOrFetchObjectFromBrowserRoute } from '../../shared/utilities/RouteComponentUtilities';
import { ROUTES } from '../../../routes.const';
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

@Component({
  selector: 'app-rcv-vote',
  templateUrl: './rcv-vote.component.html',
  styleUrls: ['./rcv-vote.component.scss'],
})
export class RcvVoteComponent implements OnInit {
  public readonly VIEW_CONFIG = VIEW_CONFIG;

  public currentElection: ElectionMetadata;
  public candidateOrdering: CandidateMetadata[];
  public selectedCandidate: CandidateMetadata;
  // TODO: Use some sort of caching
  public selectedLocalizedBusiness: LocalizedBusiness;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
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
    if (election == null || election.electionStatus != ElectionStatus.VOTING) {
      void this.router.navigate(['/']);
      return;
    }
    this.currentElection = election;
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
}
