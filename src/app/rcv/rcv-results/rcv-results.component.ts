import { Component, DoCheck, Inject, Input } from '@angular/core';
import {
  CandidateMetadata,
  ElectionMetadata,
} from '../../data/models/ElectionMetadata.class';
import {
  CandidateRoundResult,
  ElectionResult,
  ElectionRound,
  RoundAction,
} from '../../data/models/ElectionResult.interface';
import { LocalizedBusiness } from '../../data/models/LocalizedBusiness.interface';
import { BusinessService } from '../../data/services/BusinessService.interface';
import { BUSINESS_SERVICE_TOKEN } from '../../data/services/service-injection-tokens';
import { VIEW_CONFIG } from '../../view-config.const';
import { VoteCastEvent } from 'src/app/data/models/ElectionEvent.interface';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-rcv-results',
  templateUrl: './rcv-results.component.html',
  styleUrls: ['./rcv-results.component.scss'],
  animations: [
    trigger('votersLogAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateX(0)' }),
        animate('500ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class RcvResultsComponent implements DoCheck {
  public readonly viewConfig = VIEW_CONFIG;
  public readonly loadingPhrases = [
    'Waiting for the election to end...',
    'A lot of people need to cast their votes...',
    'This is taking a while...',
    "Nice weather we're having?",
    "I'm getting a little hangry",
    'Take some deep breaths',
  ];

  public electionResults: ElectionResult;
  public winner: LocalizedBusiness;

  @Input() election: ElectionMetadata;
  @Input() votersLog: VoteCastEvent[];

  constructor(
    @Inject(BUSINESS_SERVICE_TOKEN) private businessService: BusinessService
  ) {}

  ngDoCheck() {
    if (this.election && this.election.results !== this.electionResults) {
      void this.onNewElectionResults(this.election.results);
    }
  }

  private async onNewElectionResults(results: ElectionResult | undefined) {
    this.electionResults = results;
    if (!results) {
      return;
    }
    this.winner = await this.businessService
      .getLocalizedBusiness(results.winnerId)
      .toPromise();
  }

  public getSortedCandidatesForRound(
    round: ElectionRound
  ): CandidateMetadata[] {
    return Object.entries(round)
      .sort(
        ([, roundResultA], [, roundResultB]) =>
          RcvResultsComponent.getSortValueForRoundResult(roundResultA) -
          RcvResultsComponent.getSortValueForRoundResult(roundResultB)
      )
      .map(([id, roundResult]) => this.election.getCandidateMetadata(id));
  }

  private static getSortValueForRoundResult(
    candidateRoundResult: CandidateRoundResult
  ): number {
    switch (candidateRoundResult.roundAction) {
      case RoundAction.ELIMINATED:
        return 1;
      case RoundAction.WON:
      case RoundAction.WON_VIA_TIEBREAKER:
        return -1;
      default:
        return 0;
    }
  }

  public isEffectivelyEliminated(
    roundNumber: number,
    result: CandidateRoundResult
  ): boolean {
    return (
      result.roundAction == RoundAction.ELIMINATED ||
      (roundNumber == this.election.results.rounds.length - 1 &&
        result.roundAction == null)
    );
  }

  public wonElection(result: CandidateRoundResult): boolean {
    return (
      result.roundAction === RoundAction.WON || this.wonViaTieBreaker(result)
    );
  }

  public wonViaTieBreaker(result: CandidateRoundResult): boolean {
    return result.roundAction === RoundAction.WON_VIA_TIEBREAKER;
  }
}
