import { Business } from './Business.interface';

export interface Recommendation {
  business: Business;
  distance: number;
}
