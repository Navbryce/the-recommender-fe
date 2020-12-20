import { Component, OnInit } from '@angular/core';
import { GeoCoordinates } from './data/models/GeoCoordinates.interface';
import { TEST_RECOMMENDATION } from './data/test-data/test-recommendation.const';
import {
  TEST_SESSION,
  TEST_SESSION_COMPLETED,
} from './data/test-data/test-session';
import { RequestService } from './data/services/request.service';
import { SearchApiClient } from './search-client/search-api-client.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  recommendation = TEST_RECOMMENDATION;
  session = TEST_SESSION;
  sessionCompleted = TEST_SESSION_COMPLETED;

  constructor(private searchApiClient: SearchApiClient) {
    if (environment.useWake) {
      this.searchApiClient.get('/wake').subscribe(() => {});
    }
  }

  ngOnInit(): void {}
}
