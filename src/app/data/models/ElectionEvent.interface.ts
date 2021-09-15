export enum ElectionEventType {
  STATUS_CHANGED = 'STATUS_CHANGED',
  CANDIDATE_ADDED = 'CANDIDATE_ADDED',
  RESULTS_UPDATED = 'RESULTS_UPDATED',
}

export interface CandidateAddedPayload {
  businessId: string;
  name: string;
}

export interface ElectionEvent {
  event: ElectionEventType;
  data: CandidateAddedPayload;
}
