import { ElectionStatus } from 'src/app/data/models/ElectionStatus.enum';

export enum ElectionEventType {
  STATUS_CHANGED = 'STATUS_CHANGED',
  CANDIDATE_ADDED = 'CANDIDATE_ADDED',
  VOTE_CAST = 'VOTE_CAST',
  RESULTS_UPDATED = 'RESULTS_UPDATED',
}

export type StatusEvent = {
  status: ElectionStatus;
};

export type VoteCastEvent = {
  userId: string;
  nickname: string;
};
