import { ElectionMetadata } from '../models/ElectionMetadata.class';
import { Observable } from 'rxjs';
import { ObservableEventSource } from './request.service';
import { ElectionStatus } from '../models/ElectionStatus.enum';
import { ElectionResult } from '../models/ElectionResult.interface';

export interface RCVService {
  createElection(): Observable<ElectionMetadata>;
  getElectionEventStream(electionId: string): ObservableEventSource;
  getElectionMetadata(electionId: string): Observable<ElectionMetadata>;
  getElectionResults(electionId: string): Observable<ElectionResult | null>;
  updateElectionState(
    electionId: string,
    newState: ElectionStatus
  ): Observable<void>;
  vote(electionId: string, businessIds: string[]): Observable<void>;
}
