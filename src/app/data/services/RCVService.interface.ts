import { Election } from '../models/Election.class';
import { Observable } from 'rxjs';

export interface RCVService {
  createElection(): Observable<Election>;
  getElectionById(electionId: string): Observable<Election>;
}
