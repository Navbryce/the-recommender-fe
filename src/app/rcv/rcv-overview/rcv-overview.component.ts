import { Component, Inject, OnInit } from '@angular/core';
import { getOrFetchObjectFromBrowserRoute } from '../../shared/utilities/RouteComponentUtilities';
import { ActivatedRoute, Router } from '@angular/router';
import { RCV_SERVICE_TOKEN } from '../../data/services/service-injection-tokens';
import { RCVService } from '../../data/services/RCVService.interface';
import { Election } from '../../data/models/Election.class';

@Component({
  selector: 'app-rcv-overview',
  templateUrl: './rcv-overview.component.html',
  styleUrls: ['./rcv-overview.component.scss'],
})
export class RcvOverviewComponent implements OnInit {
  public currentElection: Election;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(RCV_SERVICE_TOKEN) private rcvService: RCVService
  ) {
    getOrFetchObjectFromBrowserRoute(
      router,
      activatedRoute,
      'id',
      'searchSession',
      'id',
      (id) => this.rcvService.getElectionById(id)
    )[1].subscribe((election) => this.onNewCurrentElection(election));
  }

  ngOnInit(): void {}

  private onNewCurrentElection(election: Election) {
    this.currentElection = election;
  }
}
