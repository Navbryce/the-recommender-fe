import { ElectionStatus } from './ElectionStatus.enum';

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
}

export class ElectionMetadata {
  readonly id: string;
  readonly activeId: string;
  electionStatus: ElectionStatus;
  readonly candidates: CandidateMetadata[];
  readonly candidateIds: Set<string>;

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
}
