import { TEST_RECOMMENDATION } from './test-recommendation.const';
import { SearchSession } from '../models/SearchSession.class';
import { PriceCategory } from '../models/PriceCategory.enum';

export const TEST_SESSION = new SearchSession({
  id: TEST_RECOMMENDATION.sessionId,
  dinnerPartyId: null,
  currentRecommendation: TEST_RECOMMENDATION,
  searchRequest: {
    location: {
      lat: 100.0,
      long: 100.0,
    },
    attributes: [],
    searchTerm: null,
    priceCategories: [PriceCategory.HIGH],
    searchRadius: 5000,
  },
});

export const TEST_SESSION_COMPLETED = new SearchSession({
  ...TEST_SESSION,
  currentRecommendation: null,
  acceptedRecommendations: [TEST_RECOMMENDATION],
});
