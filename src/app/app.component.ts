import { Component, OnInit } from '@angular/core';
import { GeoCoordinates } from './data/models/GeoCoordinates.interface';
import { TEST_RECOMMENDATION } from './data/test-data/test-recommendation.const';
import { TEST_SESSION } from './data/test-data/test-session';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  recommendation = TEST_RECOMMENDATION;
  session = TEST_SESSION;
  ngOnInit(): void {}
}
