import { Component, Inject, Input, OnChanges } from '@angular/core';
import { Recommendation } from '../../data/models/Recommendation.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  RecommendationAction,
  SearchService,
} from '../../data/services/SearchService.interface';
import { SEARCH_SERVICE_TOKEN } from '../../data/services/service-injection-tokens';
import { first, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search-session',
  templateUrl: './search-session.component.html',
  styleUrls: ['./search-session.component.scss'],
})
export class SearchSessionComponent implements OnChanges {
  @Input() sessionIdAndCurrentRecommendation: {
    sessionId: string;
    recommendation: Recommendation;
  };

  public currentRecommendation: Recommendation;

  get sessionId(): string {
    return this.sessionIdAndCurrentRecommendation.sessionId;
  }

  constructor(
    @Inject(SEARCH_SERVICE_TOKEN) private searchService: SearchService
  ) {}

  ngOnChanges(): void {
    this.currentRecommendation = this.sessionIdAndCurrentRecommendation.recommendation;
  }

  onRejectCurrentRecommendation(): void {
    this.getNextRecommendation(RecommendationAction.REJECT);
  }

  onMaybeRecommendation(): void {
    this.getNextRecommendation(RecommendationAction.MAYBE);
  }

  private getNextRecommendation(recommendationAction: RecommendationAction) {
    console.log(this.currentRecommendation);
    return this.searchService
      .nextRecommendation(
        this.sessionId,
        this.currentRecommendation.businessId,
        recommendationAction
      )
      .pipe(first())
      .subscribe(
        (recommendation) => (this.currentRecommendation = recommendation)
      );
  }
}
