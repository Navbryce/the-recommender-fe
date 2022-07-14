import { LocalizedBusiness } from '../models/LocalizedBusiness.interface';
import { Observable } from 'rxjs';

export interface BusinessService {
  // TODO: Implement a cachable version of this
  getLocalizedBusinesses(ids: string[]): Observable<LocalizedBusiness[]>;
  getLocalizedBusiness(id: string): Observable<LocalizedBusiness>;
}
