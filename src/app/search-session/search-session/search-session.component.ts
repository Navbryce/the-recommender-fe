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
import { AlertService } from '../../shared/services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorCode } from '../../data/services/ErrorCode.enum';

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
    @Inject(SEARCH_SERVICE_TOKEN) private searchService: SearchService,
    private alertService: AlertService
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
      void this.getNextRecommendation(action);
    }
  }

  private async getNextRecommendation(
    recommendationAction: RecommendationAction
  ) {
    this.loadingRecommendation = true;
    try {
      const newRecommendation = await this.searchService
        .nextRecommendation(
          this.sessionId,
          this.currentRecommendation.businessId,
          recommendationAction
        )
        .toPromise();

      this.currentRecommendation = newRecommendation;
      this.currentSession.setNewCurrentRecommendation(
        newRecommendation,
        recommendationAction
      );
    } catch (error) {
      if (!(error instanceof HttpErrorResponse)) {
        throw error;
      }

      switch (error.error.errorCode) {
        case ErrorCode.NO_BUSINESSES_FOUND:
          this.currentRecommendation = null;
          this.currentSession.setNewCurrentRecommendation(
            null,
            recommendationAction
          );
          this.handleNoBusinessesFoundError();
          break;
        default:
          throw error;
      }
    }
    this.loadingRecommendation = false;
  }

  private handleNoBusinessesFoundError() {
    if (this.currentSession.maybeRecommendations.length > 0) {
      this.alertService.warnAlert(
        'No businesses found',
        "Restart your search or accept a 'maybe' recommendation."
      );
    } else {
      this.alertService.warnAlert(
        'No businesses found',
        'Currently, it is filtering by open businesses. Try expanding the parameters of your search. Your search will be restarted',
        () => this.router.navigate(['/'])
      );
    }
  }

  onMaybeRecommendationAction({
    recommendationActionForMaybe,
    businessId,
  }: {
    recommendationActionForMaybe: RecommendationAction;
    businessId: string;
  }) {
    if (recommendationActionForMaybe === RecommendationAction.ACCEPT) {
      this.onAcceptRecommendation(businessId);
    } else {
      this.rejectMaybeRecommendation(businessId);
      if (
        !this.currentRecommendation &&
        this.currentSession.maybeRecommendations.length === 0
      ) {
        this.handleNoBusinessesFoundError();
      }
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
