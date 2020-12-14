import { Business } from './Business.interface';

export interface Recommendation {
  sessionId: string;
  businessId: string;
  business: Business;
  distance: number;
}
