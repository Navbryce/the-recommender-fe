import { TestBed } from '@angular/core/testing';

import { SearchClient } from './search-client.service';

describe('SearchClientService', () => {
  let service: SearchClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
