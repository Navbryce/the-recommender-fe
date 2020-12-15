import { BusinessSearchParameters } from '../models/BusinessSearchParameters.interface';
import { Observable } from 'rxjs';
import { Recommendation } from '../models/Recommendation.interface';

export interface SearchService {
  newSearch(
    searchParameters: BusinessSearchParameters
  ): Observable<{ sessionId: string; recommendation: Recommendation }>;

  nextRecommendation(
    sessionId: string,
    businessId: string,
    recommendationAction: RecommendationAction
  ): Observable<Recommendation>;

  acceptRecommendation(sessionId: string, businessId: string): Observable<null>;
}

export enum RecommendationAction {
  ACCEPT = 'ACCEPT',
  REJECT = 'MAYBE',
  MAYBE = 'REJECT',
}
