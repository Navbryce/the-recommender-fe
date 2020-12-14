import { Recommendation } from '../models/Recommendation.interface';
import { TEST_BUSINESS } from './test-business.const';

export const TEST_RECOMMENDATION: Recommendation = {
  sessionId: 'test-session',
  businessId: TEST_BUSINESS.id,
  business: TEST_BUSINESS,
  distance: 5500,
};
