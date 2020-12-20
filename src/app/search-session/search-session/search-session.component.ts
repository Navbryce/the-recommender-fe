import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { Recommendation } from '../../data/models/Recommendation.interface';
import {
  RecommendationAction,
  SearchService,
} from '../../data/services/SearchService.interface';
import { SEARCH_SERVICE_TOKEN } from '../../data/services/service-injection-tokens';
import { first } from 'rxjs/operators';
import { SearchSession } from '../../data/models/SearchSession.class';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-session',
  templateUrl: './search-session.component.html',
  styleUrls: ['./search-session.component.scss'],
})
export class SearchSessionComponent {
  @Output() sessionCompleted = new EventEmitter<SearchSession>();

  public currentSession: SearchSession;
  public currentRecommendation: Recommendation;
  public loadingRecommendation = false;

  get sessionId(): string {
    return this.currentSession.id;
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(SEARCH_SERVICE_TOKEN) private searchService: SearchService
  ) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const searchSession:
      | SearchSession
      | undefined = router.getCurrentNavigation().extras.state?.searchSession;
    if (searchSession) {
      if (id !== searchSession.id) {
        throw new Error(
          `The id on the route ${id} conflicts with the search session provided ${searchSession.id}`
        );
      }
      this.onNewCurrentSession(searchSession);
    } else {
      this.searchService
        .getSearchSession(id)
        .subscribe((session) => this.onNewCurrentSession(session));
    }
  }

  private onNewCurrentSession(session: SearchSession) {
    this.currentSession = session;
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
      .subscribe(() => {
        this.currentSession.acceptRecommendation(recommendationId);
        this.sessionCompleted.emit(this.currentSession);
      });
  }

  private rejectMaybeRecommendation(recommendationId: string): void {
    this.searchService
      .rejectMaybeRecommendation(this.sessionId, recommendationId)
      .subscribe(() => {
        this.currentSession.rejectMaybeRecommendation(recommendationId);
      });
  }
}
