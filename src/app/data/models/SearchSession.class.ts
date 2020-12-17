import { BusinessSearchParameters } from './BusinessSearchParameters.interface';
import { Recommendation } from './Recommendation.interface';
import { RecommendationAction } from '../services/SearchService.interface';

export class SearchSession {
  readonly id: string;
  readonly searchRequest: BusinessSearchParameters;
  acceptedRecommendation: Recommendation | null;
  currentRecommendation: Recommendation | null;
  maybeRecommendations: Recommendation[];
  rejectedRecommendations: Recommendation[];

  constructor({
    id,
    searchRequest,
    acceptedRecommendation,
    currentRecommendation,
    maybeRecommendations,
    rejectedRecommendations,
  }: {
    id: string;
    searchRequest: BusinessSearchParameters;
    acceptedRecommendation?: Recommendation;
    currentRecommendation: Recommendation | null;
    maybeRecommendations?: Recommendation[];
    rejectedRecommendations?: Recommendation[];
  }) {
    this.id = id;
    this.searchRequest = searchRequest;
    this.acceptedRecommendation = acceptedRecommendation ?? null;
    this.currentRecommendation = currentRecommendation;
    this.maybeRecommendations = maybeRecommendations ?? [];
    this.rejectedRecommendations = rejectedRecommendations ?? [];
  }

  public acceptRecommendation(businessIdToAccept: string) {
    if (this.currentRecommendation.businessId === businessIdToAccept) {
      this.acceptCurrentRecommendation();
    } else {
      this.acceptMaybeRecommendation(businessIdToAccept);
    }
  }

  public acceptCurrentRecommendation() {
    this.acceptedRecommendation = this.currentRecommendation;
    this.currentRecommendation = null;
  }

  public acceptMaybeRecommendation(businessIdToAccept: string) {
    const businessIndex = this.maybeRecommendations.findIndex(
      ({ businessId }) => businessIdToAccept
    );
    if (businessIndex === -1) {
      throw new Error(
        `Illegal state exception: Attempted to accept recommendation with business id ${businessIdToAccept}, but business not found`
      );
    }

    this.acceptedRecommendation = this.maybeRecommendations[businessIndex];
    this.maybeRecommendations.splice(businessIndex, 1);
    this.rejectedRecommendations = [
      ...this.rejectedRecommendations,
      ...this.maybeRecommendations,
      this.currentRecommendation,
    ];

    this.currentRecommendation = null;
    this.maybeRecommendations = [];
  }

  public rejectMaybeRecommendation(businessIdToReject: string) {
    const lengthBefore = this.maybeRecommendations.length;
    this.maybeRecommendations = this.maybeRecommendations.filter(
      ({ businessId }) => businessId !== businessIdToReject
    );
    if (this.maybeRecommendations.length !== lengthBefore - 1) {
      throw new Error(
        `The maybe recommendation being rejected (${businessIdToReject}) could not be found`
      );
    }
  }

  public setNewCurrentRecommendation(
    newRecommendation: Recommendation,
    currentRecommendationAction: RecommendationAction
  ) {
    if (this.currentRecommendation == null) {
      throw new Error(
        'The current recommendation for an active session should not be null'
      );
    }
    switch (currentRecommendationAction) {
      case RecommendationAction.MAYBE:
        this.maybeRecommendations.push(this.currentRecommendation);
        break;
      case RecommendationAction.REJECT:
        this.rejectedRecommendations.push(this.currentRecommendation);
        break;
      default:
        throw new Error(
          'Cannot accept the current recommendation when setting a new recommendation for the session'
        );
    }
    this.rejectedRecommendations.push(this.currentRecommendation);
    this.currentRecommendation = newRecommendation;
  }
}
