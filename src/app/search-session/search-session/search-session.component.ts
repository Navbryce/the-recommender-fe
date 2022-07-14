import { Component, Inject, ViewChild } from '@angular/core';
import { Recommendation } from '../../data/models/Recommendation.interface';
import {
  RecommendationAction,
  SearchService,
} from '../../data/services/SearchService.interface';
import {
  AUTH_SERVICE_TOKEN,
  RCV_SERVICE_TOKEN,
  SEARCH_SERVICE_TOKEN,
} from '../../data/services/service-injection-tokens';
import { VIEW_CONFIG } from '../../view-config.const';
import { SearchSession } from '../../data/models/SearchSession.class';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../shared/services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorCode } from '../../data/services/ErrorCode.enum';
import { MatDrawer } from '@angular/material/sidenav';
import { LayoutService } from '../../shared/services/layout.service';
import {
  getDinnerPartyVoteURL,
  getOrFetchObjectFromBrowserRoute,
} from '../../shared/utilities/routing';
import { ROUTES } from '../../../routes.const';
import { RCVService } from '../../data/services/RCVService.interface';
import { ElectionEventType } from '../../data/models/ElectionEvent.interface';
import { AuthService } from '../../data/services/AuthService.interface';

@Component({
  selector: 'app-search-session',
  templateUrl: './search-session.component.html',
  styleUrls: ['./search-session.component.scss'],
})
export class SearchSessionComponent {
  public readonly VIEW_CONFIG = VIEW_CONFIG;
  public readonly DINNER_PARTY_LABELS = {
    accept: 'Nominate',
    reject: 'Nope',
  };

  @ViewChild('drawer') maybeRecommendationDrawer: MatDrawer;

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
    @Inject(RCV_SERVICE_TOKEN) private rcvService: RCVService,
    @Inject(AUTH_SERVICE_TOKEN) private authService: AuthService,
    private alertService: AlertService,
    public layoutService: LayoutService
  ) {
    getOrFetchObjectFromBrowserRoute(
      router,
      activatedRoute,
      'id',
      ROUTES.searchSession.payloadField,
      'id',
      (id) => this.searchService.getSearchSession(id)
    )[1].subscribe((session) => this.onNewCurrentSession(session));
  }

  private async onNewCurrentSession(session: SearchSession) {
    this.currentSession = session;
    this.currentRecommendation = this.currentSession.currentRecommendation;
    if (session.isDinnerParty) {
      this.rcvService
        .getElectionEventStream(session.dinnerPartyElectionId)
        .getObservableForEvent(ElectionEventType.STATUS_CHANGED)
        .subscribe(() =>
          this.router.navigate([
            getDinnerPartyVoteURL(session.dinnerPartyElectionId),
          ])
        );
    }
  }

  async onCurrentRecommendationAction({
    action,
  }: {
    action: RecommendationAction;
  }) {
    this.loadingRecommendation = true;
    let newRecommendationMaybe: Recommendation | null;
    try {
      newRecommendationMaybe = await this.searchService
        .applyRecommendationActionToCurrent(
          this.sessionId,
          this.currentRecommendation.businessId,
          action
        )
        .toPromise();
    } catch (error) {
      if (!(error instanceof HttpErrorResponse)) {
        throw error;
      }

      switch (error.error.errorCode) {
        case ErrorCode.NO_BUSINESSES_FOUND:
          this.currentRecommendation = null;
          this.currentSession.applyRecommendationActionToCurrent(null, action);
          this.handleNoBusinessesFoundError();
          break;
        default:
          throw error;
      }

      this.loadingRecommendation = false;
      return;
    }

    this.currentSession.applyRecommendationActionToCurrent(
      newRecommendationMaybe,
      action
    );
    if (!newRecommendationMaybe && !this.currentSession.complete) {
      throw new Error(
        'No new recommendation but the search session is not complete'
      );
    }

    if (!!newRecommendationMaybe) {
      this.currentRecommendation = newRecommendationMaybe as Recommendation;
    }

    this.loadingRecommendation = false;
  }

  private async handleNoBusinessesFoundError() {
    if (this.currentSession.maybeRecommendations.length > 0) {
      void this.alertService.warnAlert(
        'No businesses found',
        "Restart your search or accept a 'maybe' recommendation."
      );
    } else {
      await this.alertService.warnAlert(
        'No businesses found',
        'Currently, it is filtering by open businesses. Try expanding the parameters of your search. Your search will be restarted'
      );
      void this.router.navigate(['/']);
    }
  }

  async onMaybeRecommendationAction({
    action: recommendationActionForMaybe,
    businessId,
  }: {
    action: RecommendationAction;
    businessId: string;
  }) {
    if (this.currentSession.isDinnerParty) {
      throw new Error('Cannot maybe a recommendation for a dinner party');
    }
    await this.searchService
      .applyRecommendationActionToMaybe(
        this.sessionId,
        businessId,
        recommendationActionForMaybe
      )
      .toPromise();

    this.currentSession.applyRecommendationActionToMaybe(
      businessId,
      recommendationActionForMaybe
    );

    if (this.currentSession.maybeRecommendations.length === 0) {
      await this.maybeRecommendationDrawer.close();
    }

    if (
      !this.currentRecommendation &&
      this.currentSession.maybeRecommendations.length === 0
    ) {
      this.handleNoBusinessesFoundError();
    }
  }
}
