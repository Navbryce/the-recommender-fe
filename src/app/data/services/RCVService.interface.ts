import { ElectionMetadata } from '../models/ElectionMetadata.class';
import { Observable } from 'rxjs';
import { ObservableEventSource } from './request.service';
import { ElectionStatus } from '../models/ElectionStatus.enum';

export interface RCVService {
  createElection(): Observable<ElectionMetadata>;
  getElectionEventStream(electionId: string): ObservableEventSource;
  getElectionMetadata(electionId: string): Observable<ElectionMetadata>;
  updateElectionState(
    electionId: string,
    newState: ElectionStatus
  ): Observable<void>;
}
