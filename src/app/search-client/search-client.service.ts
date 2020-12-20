import { Injectable } from '@angular/core';
import {
  RecommendationAction,
  SearchService,
} from '../data/services/SearchService.interface';
import { BusinessSearchParameters } from '../data/models/BusinessSearchParameters.interface';
import { Observable, pipe } from 'rxjs';
import { SearchApiClient } from './search-api-client.service';
import { Recommendation } from '../data/models/Recommendation.interface';
import {
  SearchSession,
  SearchSessionObject,
} from '../data/models/SearchSession.class';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchServiceSearchApi implements SearchService {
  private static readonly BASE_PATH = '/business-search';

  constructor(private searchApiClient: SearchApiClient) {}

  getSearchSession(sessionId: string): Observable<SearchSession> {
    return this.searchApiClient
      .get(`${SearchServiceSearchApi.BASE_PATH}/${sessionId}`)
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
    searchParameters: BusinessSearchParameters
  ): Observable<SearchSession> {
    return this.searchApiClient
      .post(SearchServiceSearchApi.BASE_PATH, searchParameters)
      .pipe(
        map(
          ({
            sessionId,
            recommendation,
          }: {
            sessionId: string;
            recommendation: Recommendation;
          }) =>
            new SearchSession({
              id: sessionId,
              searchRequest: searchParameters,
              currentRecommendation: recommendation,
            })
        )
      );
  }

  nextRecommendation(
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

  acceptRecommendation(
    sessionId: string,
    businessId: string
  ): Observable<null> {
    return this.applyRecommendationAction(
      sessionId,
      businessId,
      RecommendationAction.ACCEPT
    ) as Observable<null>;
  }

  rejectMaybeRecommendation(
    sessionId: string,
    businessId: string
  ): Observable<null> {
    return this.applyRecommendationAction(
      sessionId,
      businessId,
      RecommendationAction.REJECT,
      false
    ) as Observable<null>;
  }

  private applyRecommendationAction(
    sessionId,
    businessId: string,
    recommendationAction: RecommendationAction,
    isCurrent?: boolean
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
      `${SearchServiceSearchApi.BASE_PATH}/${sessionId}`,
      body
    );
  }
}
