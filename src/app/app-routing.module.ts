import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecommendationEngineComponent } from './recommendation-engine/recommendation-engine.component';
import { SearchSessionComponent } from './search-session/search-session/search-session.component';
import { ROUTES } from '../routes.const';
import { RcvOverviewComponent } from './rcv/rcv-overview/rcv-overview.component';

const routes: Routes = [
  { path: '', component: RecommendationEngineComponent },
  {
    path: `${ROUTES.searchSession.path}/:id`,
    component: SearchSessionComponent,
  },
  {
    path: `${ROUTES.electionOverview.path}/:id`,
    component: RcvOverviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
