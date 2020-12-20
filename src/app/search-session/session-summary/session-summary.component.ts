import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchSession } from '../../data/models/SearchSession.class';
import { Recommendation } from '../../data/models/Recommendation.interface';

@Component({
  selector: 'app-session-summary',
  templateUrl: './session-summary.component.html',
  styleUrls: ['./session-summary.component.scss'],
})
export class SessionSummaryComponent implements OnInit {
  @Input() session: SearchSession;

  get acceptedRecommendation(): Recommendation {
    return this.session.acceptedRecommendation;
  }

  constructor() {}

  ngOnInit(): void {}
}
