import { InjectionToken } from '@angular/core';
import { SearchService } from './SearchService.interface';

export const SEARCH_SERVICE_TOKEN = new InjectionToken<SearchService>(
  'search-client-service'
);
