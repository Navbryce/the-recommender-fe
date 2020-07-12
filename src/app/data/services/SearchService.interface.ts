import { BusinessSearchParameters } from '../models/BusinessSearchParameters.interface';

export interface SearchService {
  newSearch(searchParameters: BusinessSearchParameters);
}
