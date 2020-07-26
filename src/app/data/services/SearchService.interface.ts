import { BusinessSearchParameters } from '../models/BusinessSearchParameters.interface';
import { SearchSession } from '../models/SearchSession.interface';
import { Observable } from 'rxjs';

export interface SearchService {
  newSearch(
    searchParameters: BusinessSearchParameters
  ): Observable<SearchSession>;
  nextRecommendation(searchSession: SearchSession): Observable<SearchSession>;
}
