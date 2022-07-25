import { Injectable } from '@angular/core';
import { RCVService } from '../data/services/RCVService.interface';
import { AppClientService } from './app-client.service';
import { Observable } from 'rxjs';
import { ElectionMetadata } from '../data/models/ElectionMetadata.class';
import { ObservableEventSource } from '../data/services/request.service';
import { map } from 'rxjs/operators';
import { ElectionStatus } from '../data/models/ElectionStatus.enum';
import {
  ElectionResult,
  ElectionResultObject,
} from '../data/models/ElectionResult.interface';

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
    return this.appClient.getServerSentEvents(
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

  getElectionResults(id: string): Observable<ElectionResult | null> {
    return this.appClient
      .get<ElectionResultObject | null>(
        `${AppRCVClientService.BASE_PATH}/${id}/results`,
        null
      )
      .pipe(map((value) => (value ? new ElectionResult(value) : null)));
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

  vote(electionId: string, businessIds: string[]): Observable<void> {
    return this.appClient.put<void>(
      `${AppRCVClientService.BASE_PATH}/${electionId}/vote`,
      {
        votes: businessIds,
      }
    );
  }
}
