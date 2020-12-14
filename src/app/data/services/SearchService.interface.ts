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
}

export enum RecommendationAction {
  REJECT = 'MAYBE',
  MAYBE = 'REJECT',
}
