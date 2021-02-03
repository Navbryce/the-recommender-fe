import { Component, Inject, OnInit } from '@angular/core';
import { TEST_RECOMMENDATION } from './data/test-data/test-recommendation.const';
import {
  TEST_SESSION,
  TEST_SESSION_COMPLETED,
} from './data/test-data/test-session';
import { environment } from '../environments/environment';
import { AppClientService } from './app-client/app-client.service';
import { RCVService } from './data/services/RCVService.interface';
import { Router } from '@angular/router';
import { ROUTES } from '../routes.const';
import { RCV_SERVICE_TOKEN } from './data/services/service-injection-tokens';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  recommendation = TEST_RECOMMENDATION;
  session = TEST_SESSION;
  sessionCompleted = TEST_SESSION_COMPLETED;

  constructor(
    private searchApiClient: AppClientService,
    @Inject(RCV_SERVICE_TOKEN) private rcvClientService: RCVService,
    private router: Router
  ) {
    if (environment.useWake) {
      this.searchApiClient.get('/wake').subscribe(() => {});
    }
  }

  ngOnInit(): void {}

  onRCVCreateClick() {
    this.rcvClientService.createElection().subscribe((newElection) =>
      this.router.navigate(
        [`${ROUTES.electionOverview.path}/${newElection.id}`],
        {
          state: {
            [ROUTES.electionOverview.payloadField]: newElection,
          },
        }
      )
    );
  }
}
