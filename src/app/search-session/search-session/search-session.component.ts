import { Component, Input, OnChanges } from '@angular/core';
import { Recommendation } from '../../data/models/Recommendation.interface';

@Component({
  selector: 'app-search-session',
  templateUrl: './search-session.component.html',
  styleUrls: ['./search-session.component.scss'],
})
export class SearchSessionComponent implements OnChanges {
  @Input() sessionIdAndCurrentRecommendation: {
    sesssionId: string;
    recommendation: Recommendation;
  };

  public currentRecommendation: Recommendation;

  get sessionId(): string {
    return this.sessionIdAndCurrentRecommendation.sesssionId;
  }

  ngOnChanges(): void {
    console.log(this.sessionIdAndCurrentRecommendation);
    this.currentRecommendation = this.sessionIdAndCurrentRecommendation.recommendation;
  }
}
