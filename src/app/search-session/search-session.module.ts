import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchSessionComponent } from './search-session/search-session.component';
import { RecommendationCardComponent } from './recommendation-card/recommendation-card.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SearchSessionComponent, RecommendationCardComponent],
  imports: [CommonModule, MatCardModule, SharedModule],
  exports: [SearchSessionComponent],
})
export class SearchSessionModule {}
