import { ElectionStatus } from './ElectionStatus.enum';
import {
  CandidateRoundResult,
  ElectionResult,
  RoundAction,
} from './ElectionResult.interface';

export interface CandidateMetadata {
  name: string;
  businessId: string;
  nominatorNickname: string;
}

export interface ElectionMetadataObject {
  id: string;
  activeId: string;
  electionStatus: ElectionStatus;
  candidates: CandidateMetadata[];
  results: ElectionResult | null;
}

export class ElectionMetadata {
  readonly id: string;
  readonly activeId: string;
  electionStatus: ElectionStatus;
  readonly candidates: CandidateMetadata[];
  readonly candidateIds: Set<string>;
  results: ElectionResult | null;

  constructor({
    id,
    activeId,
    electionStatus,
    candidates,
  }: ElectionMetadataObject) {
    this.id = id;
    this.activeId = activeId;
    this.electionStatus = electionStatus;
    this.candidates = candidates ?? [];
    this.candidateIds = new Set(
      this.candidates.map((candidate) => candidate.businessId)
    );
  }

  public addCandidateMetadata(candidate: CandidateMetadata) {
    if (this.candidateIds.has(candidate.businessId)) {
      return;
    }
    this.candidates.push(candidate);
    this.candidateIds.add(candidate.businessId);
  }

  public setElectionResults(results: ElectionResult) {
    this.results = results;
  }

  public getCandidateMetadata(id: string): CandidateMetadata {
    if (!this.candidateIds.has(id)) {
      throw new Error('Candidate does not exist');
    }
    return this.candidates.find((candidate) => candidate.businessId == id);
  }
}
