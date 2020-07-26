import { Component, Inject, OnInit } from '@angular/core';
import { BusinessSearchParameters } from '../data/models/BusinessSearchParameters.interface';
import { SEARCH_SERVICE_TOKEN } from '../data/services/service-injection-tokens';
import { SearchService } from '../data/services/SearchService.interface';
import { SearchSession } from '../data/models/SearchSession.interface';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-recommendation-engine',
  templateUrl: './recommendation-engine.component.html',
  styleUrls: ['./recommendation-engine.component.scss'],
})
export class RecommendationEngineComponent implements OnInit {
  public searchSessionUpdated: Observable<SearchSession>;

  private searchSessionUpdatedSubject: ReplaySubject<SearchSession>;

  constructor(
    @Inject(SEARCH_SERVICE_TOKEN) private searchService: SearchService
  ) {
    this.searchSessionUpdatedSubject = new ReplaySubject<SearchSession>();
    this.searchSessionUpdated = this.searchSessionUpdatedSubject.asObservable();
  }

  ngOnInit(): void {}

  onSearchParameters(searchParameters: BusinessSearchParameters) {
    this.searchService
      .newSearch(searchParameters)
      .subscribe((session) => this.setNewSearchSession(session));
  }

  setNewSearchSession(searchSession: SearchSession) {
    console.log(searchSession);
    this.searchSessionUpdatedSubject.next(searchSession);
  }
}
