import { Injectable } from '@angular/core';
import { SearchService } from '../data/services/SearchService.interface';
import { BusinessSearchParameters } from '../data/models/BusinessSearchParameters.interface';
import { SearchSession } from '../data/models/SearchSession.interface';
import { Observable } from 'rxjs';
import { SearchApiClient } from './search-api-client.service';

@Injectable({
  providedIn: 'root',
})
export class SearchServiceSearchApi implements SearchService {
  private static readonly BASE_PATH = '/business-search';
  constructor(private searchApiClient: SearchApiClient) {}

  newSearch(
    searchParameters: BusinessSearchParameters
  ): Observable<SearchSession> {
    return this.searchApiClient.post(
      SearchServiceSearchApi.BASE_PATH,
      searchParameters
    ) as Observable<SearchSession>;
  }

  nextRecommendation(searchSession: SearchSession): Observable<SearchSession> {
    return undefined;
  }
}
