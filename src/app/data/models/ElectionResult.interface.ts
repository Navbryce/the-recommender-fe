export enum RoundAction {
  ELIMINATED = 'ELIMINATED',
  WON = 'WON',
  WON_VIA_TIEBREAKER = 'WON_VIA_TIEBREAKER',
}

export interface CandidateRoundResult {
  numberOfRankOneVotes: number;
  roundAction: RoundAction;
}

export type ElectionRound = { [businessId: string]: CandidateRoundResult };

export interface ElectionResultObject {
  calculatedAt: number;
  rounds: ElectionRound[];
}

export class ElectionResult {
  public readonly rounds: ElectionRound[];
  public readonly calculatedAt: number;
  public readonly winnerId: string;

  constructor({ rounds, calculatedAt }: ElectionResultObject) {
    this.rounds = rounds;
    this.calculatedAt = calculatedAt;
    this.winnerId = Object.entries(rounds[rounds.length - 1]).find(
      ([, { roundAction }]) =>
        roundAction == RoundAction.WON ||
        roundAction == RoundAction.WON_VIA_TIEBREAKER
    )[0];
  }
}
