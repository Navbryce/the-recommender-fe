import { Injectable } from '@angular/core';
import { SearchService } from '../data/services/SearchService.interface';
import { BusinessSearchParameters } from '../data/models/BusinessSearchParameters.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchClient implements SearchService {
  constructor() {}

  newSearch(searchParameters: BusinessSearchParameters) {}
}
