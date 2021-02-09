import { Injectable } from '@angular/core';
import {
  RecommendationAction,
  SearchService,
} from '../data/services/SearchService.interface';
import { Observable } from 'rxjs';
import { AppClientService } from './app-client.service';
import { Recommendation } from '../data/models/Recommendation.interface';
import {
  SearchSession,
  SearchSessionObject,
} from '../data/models/SearchSession.class';
import { map } from 'rxjs/operators';
import { SearchSessionParameters } from '../data/models/SearchSessionParameters.interface';

@Injectable({
  providedIn: 'root',
})
export class AppSearchClient implements SearchService {
  private static readonly BASE_PATH = '/business-search';

  constructor(private searchApiClient: AppClientService) {}

  getSearchSession(sessionId: string): Observable<SearchSession> {
    return this.searchApiClient
      .get(`${AppSearchClient.BASE_PATH}/${sessionId}`)
      .pipe(
        map(
          (sessionObject: SearchSessionObject) =>
            new SearchSession({
              ...sessionObject,
            })
        )
      );
  }

  newSearch(
    searchParameters: SearchSessionParameters
  ): Observable<SearchSession> {
    return this.searchApiClient
      .post(AppSearchClient.BASE_PATH, searchParameters)
      .pipe(
        map(
          ({
            sessionId,
            recommendation,
            dinnerPartyId,
          }: {
            sessionId: string;
            recommendation: Recommendation;
            dinnerPartyId: string;
          }) =>
            new SearchSession({
              id: sessionId,
              searchRequest: searchParameters.businessSearchParameters,
              currentRecommendation: recommendation,
              dinnerPartyId: dinnerPartyId,
            })
        )
      );
  }

  applyRecommendationActionToCurrent(
    sessionId: string,
    businessId: string,
    recommendationAction: RecommendationAction
  ): Observable<Recommendation> {
    return this.applyRecommendationAction(
      sessionId,
      businessId,
      recommendationAction,
      true
    ) as Observable<null>;
  }

  applyRecommendationActionToMaybe(
    sessionId: string,
    businessId: string,
    recommendationAction: RecommendationAction
  ): Observable<null> {
    return this.applyRecommendationAction(
      sessionId,
      businessId,
      recommendationAction,
      false
    ) as Observable<null>;
  }

  private applyRecommendationAction(
    sessionId,
    businessId: string,
    recommendationAction: RecommendationAction,
    isCurrent: boolean
  ): Observable<Recommendation | null> {
    const body: {
      recommendationId: string;
      recommendationAction: RecommendationAction;
      isCurrent?: boolean;
    } = {
      recommendationId: businessId,
      recommendationAction,
    };

    if (isCurrent !== undefined) {
      body.isCurrent = isCurrent;
    }

    return this.searchApiClient.post(
      `${AppSearchClient.BASE_PATH}/${sessionId}`,
      body
    );
  }
}
