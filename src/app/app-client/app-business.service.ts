import { Injectable } from '@angular/core';
import { BusinessService } from '../data/services/BusinessService.interface';
import { LocalizedBusiness } from '../data/models/LocalizedBusiness.interface';
import { Observable } from 'rxjs';
import { AppClientService } from './app-client.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppBusinessService implements BusinessService {
  private readonly BASE_PATH = '/business';

  constructor(private appClientService: AppClientService) {}

  getLocalizedBusinesses(ids: string[]): Observable<LocalizedBusiness[]> {
    return this.appClientService.get(
      `${this.BASE_PATH}/localized`,
      new HttpParams({
        fromObject: { ids: ids.join(',') },
      })
    );
  }
}
