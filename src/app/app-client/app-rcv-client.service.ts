import { Injectable } from '@angular/core';
import { RCVService } from '../data/services/RCVService.interface';
import { AppClientService } from './app-client.service';
import { Election, ElectionObject } from '../data/models/Election.class';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ElectionStatus } from '../data/models/ElectionStatus.enum';

@Injectable({
  providedIn: 'root',
})
export class AppRCVClientService implements RCVService {
  private static readonly BASE_PATH = '/rcv';

  constructor(private appClient: AppClientService) {}

  createElection(): Observable<Election> {
    return this.appClient
      .put<{ election: { id: string; activeId: string } }>(
        AppRCVClientService.BASE_PATH,
        {
          location,
        }
      )
      .pipe(
        map(
          ({ election: { id, activeId } }) =>
            new Election({
              id,
              activeId,
              electionStatus: ElectionStatus.IN_CREATION,
            })
        )
      );
  }

  getElectionById(id: string): Observable<Election> {
    return this.appClient
      .get<ElectionObject>(`${AppRCVClientService.BASE_PATH}/${id}`, {
        location,
      })
      .pipe(map((electionObject) => new Election(electionObject)));
  }
}
