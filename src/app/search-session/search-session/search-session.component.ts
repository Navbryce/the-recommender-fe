import { Component, Inject, Input, OnChanges } from '@angular/core';
import { Recommendation } from '../../data/models/Recommendation.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  RecommendationAction,
  SearchService,
} from '../../data/services/SearchService.interface';
import { SEARCH_SERVICE_TOKEN } from '../../data/services/service-injection-tokens';
import { first, tap } from 'rxjs/operators';
import { SearchSession } from '../../data/models/SearchSession.class';

@Component({
  selector: 'app-search-session',
  templateUrl: './search-session.component.html',
  styleUrls: ['./search-session.component.scss'],
})
export class SearchSessionComponent implements OnChanges {
  @Input() currentSession: SearchSession;

  public currentRecommendation: Recommendation;
  public loadingRecommendation = false;

  get sessionId(): string {
    return this.currentSession.id;
  }

  constructor(
    @Inject(SEARCH_SERVICE_TOKEN) private searchService: SearchService
  ) {}

  ngOnChanges(): void {
    this.currentRecommendation = this.currentSession.currentRecommendation;
  }

  onCurrentRecommendationAction({ action }: { action: RecommendationAction }) {
    if (action === RecommendationAction.ACCEPT) {
      this.onAcceptRecommendation(
        this.currentSession.currentRecommendation.businessId
      );
    } else {
      this.getNextRecommendation(action);
    }
  }

  private getNextRecommendation(recommendationAction: RecommendationAction) {
    this.loadingRecommendation = true;
    return this.searchService
      .nextRecommendation(
        this.sessionId,
        this.currentRecommendation.businessId,
        recommendationAction
      )
      .pipe(first())
      .subscribe((recommendation) => {
        this.currentSession.setNewCurrentRecommendation(
          recommendation,
          recommendationAction
        );
        this.currentRecommendation = recommendation;
        this.loadingRecommendation = false;
      });
  }

  onMaybeRecommendationAction({
    action,
    businessId,
  }: {
    action: RecommendationAction;
    businessId: string;
  }) {
    if (action === RecommendationAction.ACCEPT) {
      this.onAcceptRecommendation(businessId);
    } else {
      this.rejectMaybeRecommendation(businessId);
    }
  }

  private onAcceptRecommendation(recommendationId: string): void {
    this.searchService
      .acceptRecommendation(
        this.sessionId,
        this.currentRecommendation.businessId
      )
      .subscribe(() =>
        this.currentSession.acceptRecommendation(recommendationId)
      );
  }

  private rejectMaybeRecommendation(recommendationId: string): void {
    this.searchService
      .rejectMaybeRecommendation(this.sessionId, recommendationId)
      .subscribe(() => {
        this.currentSession.rejectMaybeRecommendation(recommendationId);
      });
  }
}
