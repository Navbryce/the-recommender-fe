import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecommendationEngineComponent } from './recommendation-engine/recommendation-engine.component';
import { SearchSessionComponent } from './search-session/search-session/search-session.component';
import { ROUTES } from '../routes.const';
import { RcvOverviewComponent } from './rcv/rcv-overview/rcv-overview.component';
import { RcvVoteComponent } from './rcv/rcv-vote/rcv-vote.component';

// TODO: Maybe generate this from the routes definition const or consolidate the two
const routes: Routes = [
  { path: '', component: RecommendationEngineComponent },
  {
    path: `${ROUTES.searchSession.path}/:id`,
    component: SearchSessionComponent,
  },
  {
    path: `${ROUTES.election.path}/:id`,
    component: RcvOverviewComponent,
  },
  {
    path: `${ROUTES.election.path}/:id/${ROUTES.election.routes.vote.path}`,
    component: RcvVoteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
