import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RCV_SERVICE_TOKEN,
  SEARCH_SERVICE_TOKEN,
} from '../data/services/service-injection-tokens';
import { DataModule } from '../data/data.module';
import { AppSearchClient } from './app-search-client.service';
import { AppRCVClientService } from './app-rcv-client.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, DataModule],
  providers: [
    { provide: RCV_SERVICE_TOKEN, useClass: AppRCVClientService },
    { provide: SEARCH_SERVICE_TOKEN, useClass: AppSearchClient },
  ],
})
export class AppClientModule {}
