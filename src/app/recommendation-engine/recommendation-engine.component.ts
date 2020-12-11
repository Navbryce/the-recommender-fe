import { Component, Inject, OnInit } from '@angular/core';
import { BusinessSearchParameters } from '../data/models/BusinessSearchParameters.interface';
import { SEARCH_SERVICE_TOKEN } from '../data/services/service-injection-tokens';
import { SearchService } from '../data/services/SearchService.interface';
import { SearchSession } from '../data/models/SearchSession.interface';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { Recommendation } from '../data/models/Recommendation.interface';

@Component({
  selector: 'app-recommendation-engine',
  templateUrl: './recommendation-engine.component.html',
  styleUrls: ['./recommendation-engine.component.scss'],
})
export class RecommendationEngineComponent implements OnInit {
  public searchSessionUpdated: Observable<{
    sessionId: string;
    recommendation: Recommendation;
  }>;

  public recommendationSessionUpdated: BehaviorSubject<{
    sessionId: string;
    recommendation: Recommendation;
  }>;

  constructor(
    @Inject(SEARCH_SERVICE_TOKEN) private searchService: SearchService
  ) {
    this.recommendationSessionUpdated = new BehaviorSubject<{
      sessionId: string;
      recommendation: Recommendation;
    }>(null);
    this.searchSessionUpdated = this.recommendationSessionUpdated.asObservable();
  }

  ngOnInit(): void {}

  onSearchParameters(searchParameters: BusinessSearchParameters) {
    this.searchService
      .newSearch(searchParameters)
      .subscribe((session) => this.setNewRecommendationSession(session));
  }

  setNewRecommendationSession(searchSession: {
    sessionId: string;
    recommendation: Recommendation;
  }) {
    this.recommendationSessionUpdated.next(searchSession);
  }
}
