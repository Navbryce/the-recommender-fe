import { BusinessSearchParameters } from './BusinessSearchParameters.interface';
import { Recommendation } from './Recommendation.interface';
import { RecommendationAction } from '../services/SearchService.interface';
import { SearchSessionStatus } from './SearchSessionStatus';

export interface SearchSessionObject {
  id: string;
  searchRequest: BusinessSearchParameters;
  acceptedRecommendations?: [Recommendation] | null;
  currentRecommendation: Recommendation | null;
  maybeRecommendations?: Recommendation[];
  rejectedRecommendations?: Recommendation[];
  sessionStatus?: SearchSessionStatus;
}

export class SearchSession {
  private sessionStatus: SearchSessionStatus;

  readonly id: string;
  readonly searchRequest: BusinessSearchParameters;
  acceptedRecommendations: Recommendation[] | null;
  currentRecommendation: Recommendation | null;
  maybeRecommendations: Recommendation[];
  rejectedRecommendations: Recommendation[];

  get complete(): boolean {
    return this.sessionStatus == SearchSessionStatus.COMPLETE;
  }

  constructor({
    id,
    searchRequest,
    acceptedRecommendations,
    currentRecommendation,
    maybeRecommendations,
    rejectedRecommendations,
    sessionStatus,
  }: SearchSessionObject) {
    this.id = id;
    this.searchRequest = searchRequest;
    this.acceptedRecommendations = acceptedRecommendations ?? [];
    this.currentRecommendation = currentRecommendation;
    this.maybeRecommendations = maybeRecommendations ?? [];
    this.rejectedRecommendations = rejectedRecommendations ?? [];
    this.sessionStatus = sessionStatus ?? SearchSessionStatus.IN_PROGRESS;
  }

  public acceptRecommendation(businessIdToAccept: string) {
    if (this.currentRecommendation.businessId === businessIdToAccept) {
      this.acceptCurrentRecommendation();
    } else {
      this.acceptMaybeRecommendation(businessIdToAccept);
    }
  }

  public acceptCurrentRecommendation() {
    this.acceptedRecommendations.push(this.currentRecommendation);
    this.sessionStatus = SearchSessionStatus.COMPLETE;
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

    this.acceptedRecommendations.push(this.maybeRecommendations[businessIndex]);
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
