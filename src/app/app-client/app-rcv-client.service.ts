import { Injectable } from '@angular/core';
import { RCVService } from '../data/services/RCVService.interface';
import { AppClientService } from './app-client.service';
import { Observable } from 'rxjs';
import {
  ElectionMetadata,
  ElectionMetadataObject,
} from '../data/models/ElectionMetadata.class';
import { ElectionEvent } from '../data/models/ElectionEvent.interface';
import { ObservableEventSource } from '../data/services/request.service';
import { map } from 'rxjs/operators';
import { ElectionStatus } from '../data/models/ElectionStatus.enum';

export enum ElectionEvents {}

@Injectable({
  providedIn: 'root',
})
export class AppRCVClientService implements RCVService {
  private static readonly BASE_PATH = '/rcv';

  constructor(private appClient: AppClientService) {}

  createElection(): Observable<ElectionMetadata> {
    return this.appClient
      .put<ElectionMetadata>(AppRCVClientService.BASE_PATH, {
        location,
      })
      .pipe(map((value) => new ElectionMetadata(value)));
  }

  getElectionEventStream(id: string): ObservableEventSource {
    return this.appClient.getServerSentEvents<ElectionEvent>(
      `${AppRCVClientService.BASE_PATH}/${id}/updates`
    );
  }

  getElectionMetadata(id: string): Observable<ElectionMetadata> {
    return this.appClient
      .get<ElectionMetadata>(`${AppRCVClientService.BASE_PATH}/${id}`, {
        location,
      })
      .pipe(map((value) => new ElectionMetadata(value)));
  }

  updateElectionState(
    electionId: string,
    newState: ElectionStatus
  ): Observable<void> {
    return this.appClient.put<void>(
      `${AppRCVClientService.BASE_PATH}/${electionId}/state`,
      {
        state: newState,
      }
    );
  }
}
