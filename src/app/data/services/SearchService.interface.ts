import { BusinessSearchParameters } from '../models/BusinessSearchParameters.interface';
import { Observable } from 'rxjs';
import { Recommendation } from '../models/Recommendation.interface';
import { SearchSession } from '../models/SearchSession.class';

export interface SearchService {
  getSearchSession(sessionId: string): Observable<SearchSession>;

  newSearch(
    searchParameters: BusinessSearchParameters
  ): Observable<SearchSession>;

  nextRecommendation(
    sessionId: string,
    businessId: string,
    recommendationAction: RecommendationAction
  ): Observable<Recommendation>;

  acceptRecommendation(sessionId: string, businessId: string): Observable<null>;

  rejectMaybeRecommendation(
    sessionId: string,
    businessId: string
  ): Observable<null>;
}

export enum RecommendationAction {
  ACCEPT = 'ACCEPT',
  REJECT = 'REJECT',
  MAYBE = 'MAYBE',
}
