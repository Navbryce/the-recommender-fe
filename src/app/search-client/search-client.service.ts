import { Injectable } from '@angular/core';
import { SearchService } from '../data/services/SearchService.interface';
import { BusinessSearchParameters } from '../data/models/BusinessSearchParameters.interface';
import { Observable } from 'rxjs';
import { SearchApiClient } from './search-api-client.service';
import { Recommendation } from '../data/models/Recommendation.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchServiceSearchApi implements SearchService {
  private static readonly BASE_PATH = '/business-search';

  constructor(private searchApiClient: SearchApiClient) {}

  newSearch(
    searchParameters: BusinessSearchParameters
  ): Observable<{ sessionId: string; recommendation: Recommendation }> {
    return this.searchApiClient.post(
      SearchServiceSearchApi.BASE_PATH,
      searchParameters
    ) as Observable<{ sessionId: string; recommendation: Recommendation }>;
  }

  nextRecommendation(searchSession: string): Observable<Recommendation> {
    return undefined;
  }
}
