import { Component, Input, OnInit } from '@angular/core';
import { SearchSession } from '../../data/models/SearchSession.interface';

@Component({
  selector: 'app-session-summary',
  templateUrl: './session-summary.component.html',
  styleUrls: ['./session-summary.component.css'],
})
export class SessionSummaryComponent implements OnInit {
  @Input() session: SearchSession;

  constructor() {}

  ngOnInit(): void {}
}
