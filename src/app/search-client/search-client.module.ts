import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchServiceSearchApi } from './search-client.service';
import { SEARCH_SERVICE_TOKEN } from '../data/services/service-injection-tokens';
import { DataModule } from '../data/data.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, DataModule],
  providers: [
    { provide: SEARCH_SERVICE_TOKEN, useClass: SearchServiceSearchApi },
  ],
})
export class SearchClientModule {}
