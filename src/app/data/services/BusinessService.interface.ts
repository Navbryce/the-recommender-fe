import { LocalizedBusiness } from '../models/LocalizedBusiness.interface';
import { Observable } from 'rxjs';

export interface BusinessService {
  getLocalizedBusinesses(ids: string[]): Observable<LocalizedBusiness[]>;
  getLocalizedBusiness(id: string): Observable<LocalizedBusiness>;
}
