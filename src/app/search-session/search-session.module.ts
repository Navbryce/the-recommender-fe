import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchSessionComponent } from './search-session/search-session.component';
import { RecommendationCardComponent } from './recommendation-card/recommendation-card.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexModule } from '@angular/flex-layout';
import { SessionSummaryComponent } from './session-summary/session-summary.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    SearchSessionComponent,
    RecommendationCardComponent,
    SessionSummaryComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    FlexModule,
    MatProgressSpinnerModule,
  ],
  exports: [SearchSessionComponent, RecommendationCardComponent],
})
export class SearchSessionModule {}
