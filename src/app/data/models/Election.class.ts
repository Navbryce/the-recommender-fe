import { ElectionStatus } from './ElectionStatus.enum';

export interface ElectionObject {
  id: string;
  activeId: string;
  electionStatus: ElectionStatus;
}

export class Election {
  readonly id: string;
  readonly activeId: string;
  readonly electionStatus: ElectionStatus;

  constructor({ id, activeId, electionStatus }: ElectionObject) {
    this.id = id;
    this.activeId = activeId;
    this.electionStatus = electionStatus;
  }
}
