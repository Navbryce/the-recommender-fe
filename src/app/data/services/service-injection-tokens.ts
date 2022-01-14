import { InjectionToken } from '@angular/core';
import { SearchService } from './SearchService.interface';
import { BusinessService } from './BusinessService.interface';

export const AUTH_SERVICE_TOKEN = new InjectionToken<SearchService>(
  'auth-service'
);
export const BUSINESS_SERVICE_TOKEN = new InjectionToken<BusinessService>(
  'business-service'
);
export const RCV_SERVICE_TOKEN = new InjectionToken<SearchService>(
  'rcv-service'
);
export const SEARCH_SERVICE_TOKEN = new InjectionToken<SearchService>(
  'search-service'
);
