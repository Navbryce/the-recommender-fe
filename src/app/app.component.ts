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
import {
  AUTH_SERVICE_TOKEN,
  RCV_SERVICE_TOKEN,
} from './data/services/service-injection-tokens';
import { AuthService } from './data/services/AuthService.interface';
import { AlertService } from './shared/services/alert.service';

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
    private alertService: AlertService,
    @Inject(AUTH_SERVICE_TOKEN) private authService: AuthService,
    private appClientService: AppClientService,
    @Inject(RCV_SERVICE_TOKEN) private rcvClientService: RCVService,
    private router: Router
  ) {
    if (environment.useWake) {
      this.appClientService.get('/wake').subscribe(() => {});
    }
  }

  ngOnInit(): void {}

  async onRCVCreateClick() {
    if (!(await this.authService.currentUser.toPromise())) {
      const newUserMaybe = await this.alertService.registerBasicUserAlert();
      if (!newUserMaybe) {
        return;
      }
    }

    this.rcvClientService.createElection().subscribe((newElection) =>
      this.router.navigate([`${ROUTES.election.path}/${newElection.id}`], {
        state: {
          [ROUTES.election.payloadField]: newElection,
        },
      })
    );
  }
}
