import { ElectionStatus } from './ElectionStatus.enum';
import { ElectionResult } from './ElectionResult.interface';
import { VoteCastEvent } from 'src/app/data/models/ElectionEvent.interface';

export interface CandidateMetadata {
  name: string;
  businessId: string;
  nominatorNickname: string;
}

const ELECTION_STATE_MACHINE = {
  [ElectionStatus.IN_CREATION]: ElectionStatus.VOTING,
  [ElectionStatus.VOTING]: ElectionStatus.COMPLETE,
  [ElectionStatus.COMPLETE]: ElectionStatus.COMPLETE,
};

export interface ElectionMetadataObject {
  id: string;
  activeId: string;
  electionStatus: ElectionStatus;
  candidates: CandidateMetadata[];
  results: ElectionResult | null;
  voters?: VoteCastEvent[];
}

export class ElectionMetadata {
  readonly id: string;
  readonly activeId: string;
  readonly candidates: CandidateMetadata[];
  readonly candidateIds: Set<string>;

  electionStatus: ElectionStatus;
  results: ElectionResult | null;
  voters?: VoteCastEvent[];
  voterIds?: Set<string>;

  get nextStage(): ElectionStatus {
    return ELECTION_STATE_MACHINE[this.electionStatus];
  }

  constructor({
    id,
    activeId,
    electionStatus,
    candidates,
    voters,
  }: ElectionMetadataObject) {
    this.id = id;
    this.activeId = activeId;
    this.electionStatus = electionStatus;
    this.candidates = candidates ?? [];
    this.candidateIds = new Set(
      this.candidates.map((candidate) => candidate.businessId)
    );
    this.voters = voters;
    if (this.voters) {
      this.voterIds = new Set(voters.map((voter) => voter.userId));
    }
  }

  public addCandidateMetadata(candidate: CandidateMetadata) {
    if (this.candidateIds.has(candidate.businessId)) {
      return;
    }
    this.candidates.push(candidate);
    this.candidateIds.add(candidate.businessId);
  }

  public addVoter(voter: VoteCastEvent) {
    if (!this.voters) {
      this.voters = [voter];
      this.voterIds = new Set<string>(voter.userId);
      return;
    }
    if (this.voterIds.has(voter.userId)) {
      return;
    }
    this.voters.push(voter);
    this.voterIds.add(voter.userId);
  }

  public setElectionResults(results: ElectionResult) {
    this.results = results;
    this.electionStatus = ElectionStatus.COMPLETE;
  }

  public getCandidateMetadata(id: string): CandidateMetadata {
    if (!this.candidateIds.has(id)) {
      throw new Error('Candidate does not exist');
    }
    return this.candidates.find((candidate) => candidate.businessId === id);
  }
}
