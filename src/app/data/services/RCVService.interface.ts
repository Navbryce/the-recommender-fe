import { ElectionMetadata } from '../models/ElectionMetadata.class';
import { Observable } from 'rxjs';
import { ObservableEventSource } from './request.service';

export interface RCVService {
  createElection(): Observable<ElectionMetadata>;
  getElectionEventStream(electionId: string): ObservableEventSource;
  getElectionMetadata(electionId: string): Observable<ElectionMetadata>;
}
