import { InjectionToken } from '@angular/core';
import { SearchService } from './SearchService.interface';

export const AUTH_SERVICE_TOKEN = new InjectionToken<SearchService>(
  'auth-service'
);
export const RCV_SERVICE_TOKEN = new InjectionToken<SearchService>(
  'rcv-service'
);
export const SEARCH_SERVICE_TOKEN = new InjectionToken<SearchService>(
  'search-service'
);
