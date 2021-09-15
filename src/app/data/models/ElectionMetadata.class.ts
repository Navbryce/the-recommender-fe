import { ElectionStatus } from './ElectionStatus.enum';

export interface ElectionMetadataObject {
  id: string;
  activeId: string;
  electionStatus: ElectionStatus;
  candidatesMetadata: CandidateMetadata[];
}

interface CandidateMetadata {
  name: string;
  businessId: string;
}

export class ElectionMetadata {
  readonly id: string;
  readonly activeId: string;
  electionStatus: ElectionStatus;
  readonly candidatesMetadata: CandidateMetadata[];

  constructor({
    id,
    activeId,
    electionStatus,
    candidatesMetadata,
  }: ElectionMetadataObject) {
    this.id = id;
    this.activeId = activeId;
    this.electionStatus = electionStatus;
    this.candidatesMetadata = candidatesMetadata ?? [];
  }
}
