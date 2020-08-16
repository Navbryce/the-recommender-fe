import { Component, Input, OnChanges } from '@angular/core';
import { SearchSession } from '../../data/models/SearchSession.interface';
import { Recommendation } from '../../data/models/Recommendation.interface';
import { TEST_RECOMMENDATION } from '../../data/test-data/test-recommendation.const';

@Component({
  selector: 'app-search-session',
  templateUrl: './search-session.component.html',
  styleUrls: ['./search-session.component.scss'],
})
export class SearchSessionComponent implements OnChanges {
  @Input() searchSession: SearchSession;

  public currentRecommendation: Recommendation = TEST_RECOMMENDATION;

  ngOnChanges(): void {}
}
