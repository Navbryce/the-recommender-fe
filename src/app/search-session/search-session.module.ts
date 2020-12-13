import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchSessionComponent } from './search-session/search-session.component';
import { RecommendationCardComponent } from './recommendation-card/recommendation-card.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexModule } from '@angular/flex-layout';

@NgModule({
  declarations: [SearchSessionComponent, RecommendationCardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    FlexModule,
  ],
  exports: [SearchSessionComponent, RecommendationCardComponent],
})
export class SearchSessionModule {}
