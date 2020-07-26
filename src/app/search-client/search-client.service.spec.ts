import { TestBed } from '@angular/core/testing';

import { SearchServiceSearchApi } from './search-client.service';

describe('SearchClientService', () => {
  let service: SearchServiceSearchApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchServiceSearchApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
