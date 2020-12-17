import { Component, Inject, OnInit } from '@angular/core';
import { BusinessSearchParameters } from '../data/models/BusinessSearchParameters.interface';
import { SEARCH_SERVICE_TOKEN } from '../data/services/service-injection-tokens';
import { SearchService } from '../data/services/SearchService.interface';
import { SearchSession } from '../data/models/SearchSession.class';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { Recommendation } from '../data/models/Recommendation.interface';

@Component({
  selector: 'app-recommendation-engine',
  templateUrl: './recommendation-engine.component.html',
  styleUrls: ['./recommendation-engine.component.scss'],
})
export class RecommendationEngineComponent implements OnInit {
  public searchSessionUpdated: Observable<SearchSession>;

  public recommendationSessionUpdated: BehaviorSubject<SearchSession>;
  public generatingSession = false;

  constructor(
    @Inject(SEARCH_SERVICE_TOKEN) private searchService: SearchService
  ) {
    this.recommendationSessionUpdated = new BehaviorSubject<SearchSession>(
      null
    );
    this.searchSessionUpdated = this.recommendationSessionUpdated.asObservable();
  }

  ngOnInit(): void {}

  onSearchParameters(searchParameters: BusinessSearchParameters) {
    this.generatingSession = true;
    this.searchService
      .newSearch(searchParameters)
      .subscribe((sessionIdAndRecommendation) =>
        this.setNewRecommendationSession({
          ...sessionIdAndRecommendation,
          searchParameters,
        })
      );
  }

  setNewRecommendationSession({
    sessionId,
    recommendation,
    searchParameters,
  }: {
    sessionId: string;
    recommendation: Recommendation;
    searchParameters: BusinessSearchParameters;
  }) {
    this.recommendationSessionUpdated.next(
      new SearchSession({
        id: sessionId,
        searchRequest: searchParameters,
        currentRecommendation: recommendation,
      })
    );
    this.generatingSession = false;
  }
}
