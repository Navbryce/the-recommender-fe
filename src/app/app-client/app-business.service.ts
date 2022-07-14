import { Injectable } from '@angular/core';
import { BusinessService } from '../data/services/BusinessService.interface';
import { LocalizedBusiness } from '../data/models/LocalizedBusiness.interface';
import { Observable } from 'rxjs';
import { AppClientService } from './app-client.service';
import { HttpParams } from '@angular/common/http';
import { first, flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppBusinessService implements BusinessService {
  private readonly BASE_PATH = '/business';

  constructor(private appClientService: AppClientService) {}

  getLocalizedBusiness(id: string): Observable<LocalizedBusiness> {
    return this.getLocalizedBusinesses([id]).pipe(
      flatMap((value) => value),
      first()
    );
  }

  getLocalizedBusinesses(ids: string[]): Observable<LocalizedBusiness[]> {
    return this.appClientService.get(
      `${this.BASE_PATH}/localized`,
      undefined,
      new HttpParams({
        fromObject: { ids: ids.join(',') },
      })
    );
  }
}
