import { Observable } from 'rxjs';
import { Recommendation } from '../models/Recommendation.interface';
import { SearchSession } from '../models/SearchSession.class';
import { SearchSessionParameters } from '../models/SearchSessionParameters.interface';

export interface SearchService {
  getSearchSession(sessionId: string): Observable<SearchSession>;

  newSearch(
    searchSessionParameters: SearchSessionParameters
  ): Observable<SearchSession>;

  applyRecommendationActionToCurrent(
    sessionId: string,
    businessId: string,
    recommendationAction: RecommendationAction
  ): Observable<Recommendation | null>;

  applyRecommendationActionToMaybe(
    sessionId: string,
    businessId: string,
    recommendationAction: RecommendationAction
  ): Observable<null>;
}

export enum RecommendationAction {
  ACCEPT = 'ACCEPT',
  REJECT = 'REJECT',
  MAYBE = 'MAYBE',
}
