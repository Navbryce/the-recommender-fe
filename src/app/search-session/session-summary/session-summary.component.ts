import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchSession } from '../../data/models/SearchSession.class';
import { Recommendation } from '../../data/models/Recommendation.interface';
import { VIEW_CONFIG } from '../../view-config.const';

@Component({
  selector: 'app-session-summary',
  templateUrl: './session-summary.component.html',
  styleUrls: ['./session-summary.component.scss'],
})
export class SessionSummaryComponent implements OnInit {
  public readonly VIEW_CONFIG = VIEW_CONFIG;

  @Input() session: SearchSession;

  get acceptedRecommendation(): Recommendation {
    return this.session.acceptedRecommendation;
  }

  constructor() {}

  ngOnInit(): void {}
}
