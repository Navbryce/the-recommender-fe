import { Component, DoCheck, Inject, Input, OnChanges } from '@angular/core';
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

@Component({
  selector: 'app-rcv-results',
  templateUrl: './rcv-results.component.html',
  styleUrls: ['./rcv-results.component.scss'],
})
export class RcvResultsComponent implements DoCheck {
  public electionResults: ElectionResult;
  public winner: LocalizedBusiness;

  @Input() election: ElectionMetadata;

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

  public wonViaTieBreaker(result: CandidateRoundResult): boolean {
    return result.roundAction == RoundAction.WON_VIA_TIEBREAKER;
  }
}
