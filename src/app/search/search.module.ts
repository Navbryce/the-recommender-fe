import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchClient } from './search-client.service';
import { SEARCH_SERVICE_TOKEN } from '../data/services/service-injection-tokens';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [{ provide: SEARCH_SERVICE_TOKEN, useClass: SearchClient }],
})
export class SearchModule {}
