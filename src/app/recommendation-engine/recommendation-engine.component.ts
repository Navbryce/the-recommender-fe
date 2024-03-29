import { Component, Inject, OnInit } from '@angular/core';
import {
  AUTH_SERVICE_TOKEN,
  SEARCH_SERVICE_TOKEN,
} from '../data/services/service-injection-tokens';
import { SearchService } from '../data/services/SearchService.interface';
import { SearchSession } from '../data/models/SearchSession.class';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ROUTES } from '../../routes.const';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorCode } from '../data/services/ErrorCode.enum';
import { AlertService } from '../shared/services/alert.service';
import { VIEW_CONFIG } from '../view-config.const';
import { SearchSessionParameters } from '../data/models/SearchSessionParameters.interface';
import { AuthService } from '../data/services/AuthService.interface';
import { ElectionStatus } from '../data/models/ElectionStatus.enum';
import { getDinnerPartyVoteURL } from '../shared/utilities/routing';

@Component({
  selector: 'app-recommendation-engine',
  templateUrl: './recommendation-engine.component.html',
  styleUrls: ['./recommendation-engine.component.scss'],
})
export class RecommendationEngineComponent implements OnInit {
  public VIEW_CONFIG = VIEW_CONFIG;

  public searchSessionUpdated: Observable<SearchSession>;

  public recommendationSessionUpdated: BehaviorSubject<SearchSession>;
  public generatingSession = false;

  constructor(
    @Inject(AUTH_SERVICE_TOKEN) private authService: AuthService,
    @Inject(SEARCH_SERVICE_TOKEN) private searchService: SearchService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.recommendationSessionUpdated = new BehaviorSubject<SearchSession>(
      null
    );
    this.searchSessionUpdated = this.recommendationSessionUpdated.asObservable();
  }

  ngOnInit(): void {}

  async onSearchParameters(searchParameters: SearchSessionParameters) {
    this.generatingSession = true;
    try {
      // user needs to be logged-in if joining a dinner-party
      if (
        searchParameters.dinnerPartyActiveId &&
        !(await this.authService.currentUser.toPromise())
      ) {
        await this.alertService.registerBasicUserAlert(false);
      }

      const session = await this.searchService
        .newSearch(searchParameters)
        .toPromise();
      void this.router.navigate(
        [`${ROUTES.searchSession.path}/${session.id}`],
        {
          state: {
            [ROUTES.searchSession.payloadField]: session,
          },
        }
      );
    } catch (error) {
      if (!(error instanceof HttpErrorResponse)) {
        throw error;
      }

      switch (error.error.errorCode) {
        case ErrorCode.INVALID_ELECTION_STATUS:
          if (error.error.status === ElectionStatus.VOTING) {
            void this.router.navigate([
              getDinnerPartyVoteURL(error.error.electionId),
            ]);
            return;
          }
          this.generatingSession = false;
          throw error;
        case ErrorCode.NO_BUSINESSES_FOUND:
          void this.alertService.warnAlert(
            'No businesses found',
            'Try expanding the criteria of your search. Currently, it is filtering by currently open businesses'
          );
          this.generatingSession = false;
          break;
        case ErrorCode.NO_ELECTION_FOUND:
          void this.alertService.warnAlert(
            'Election not found',
            `The dinner party with code, ${searchParameters.dinnerPartyActiveId}, was not found.`
          );
          this.generatingSession = false;
        default:
          this.generatingSession = false;
          throw error;
      }
    }
  }
}
