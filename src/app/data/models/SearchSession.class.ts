import { BusinessSearchParameters } from './BusinessSearchParameters.interface';
import { Recommendation } from './Recommendation.interface';
import { RecommendationAction } from '../services/SearchService.interface';
import { SearchSessionStatus } from './SearchSessionStatus';

export interface SearchSessionObject {
  id: string;
  searchRequest: BusinessSearchParameters;
  dinnerPartyId: string | null;
  sessionStatus?: SearchSessionStatus;

  acceptedRecommendations?: [Recommendation] | null;
  currentRecommendation: Recommendation | null;
  maybeRecommendations?: Recommendation[];
  rejectedRecommendations?: Recommendation[];
}

export class SearchSession {
  readonly id: string;
  readonly searchRequest: BusinessSearchParameters;
  readonly dinnerPartyId: string | null;
  sessionStatus: SearchSessionStatus;

  acceptedRecommendations: Recommendation[] | null;
  currentRecommendation: Recommendation | null;
  maybeRecommendations: Recommendation[];
  rejectedRecommendations: Recommendation[];

  get isDinnerParty(): boolean {
    return !!this.dinnerPartyId;
  }

  get complete(): boolean {
    return this.sessionStatus == SearchSessionStatus.COMPLETE;
  }

  constructor({
    id,
    searchRequest,
    dinnerPartyId,
    sessionStatus,
    acceptedRecommendations,
    currentRecommendation,
    maybeRecommendations,
    rejectedRecommendations,
  }: SearchSessionObject) {
    this.id = id;
    this.searchRequest = searchRequest;
    this.sessionStatus = sessionStatus ?? SearchSessionStatus.IN_PROGRESS;
    this.dinnerPartyId = dinnerPartyId;
    this.acceptedRecommendations = acceptedRecommendations ?? [];
    this.currentRecommendation = currentRecommendation;
    this.maybeRecommendations = maybeRecommendations ?? [];
    this.rejectedRecommendations = rejectedRecommendations ?? [];
  }

  public applyRecommendationActionToCurrent(
    newRecommendation: Recommendation | null,
    currentRecommendationAction: RecommendationAction
  ) {
    switch (currentRecommendationAction) {
      case RecommendationAction.MAYBE:
        if (this.isDinnerParty) {
          throw new Error(
            'Cannot maybe a recommendation for a dinner party session'
          );
        }

        this.maybeRecommendations.push(this.currentRecommendation);
        break;
      case RecommendationAction.REJECT:
        this.rejectedRecommendations.push(this.currentRecommendation);
        break;
      case RecommendationAction.ACCEPT:
        if (!!newRecommendation && !this.isDinnerParty) {
          throw new Error(
            'Cannot accept and a recommendation and get a new standard session for a standard search session'
          );
        }
        this.acceptCurrentRecommendation();
        break;
      default:
        throw new Error(
          'Cannot accept the current recommendation when setting a new recommendation for the session'
        );
    }
    this.currentRecommendation = newRecommendation;
  }

  public acceptCurrentRecommendation() {
    this.acceptedRecommendations.push(this.currentRecommendation);
    this.currentRecommendation = null;

    if (!this.isDinnerParty) {
      this.completeSession();
    }
  }

  public applyRecommendationActionToMaybe(
    recommendationId: string,
    recommendationAction: RecommendationAction
  ) {
    switch (recommendationAction) {
      case RecommendationAction.REJECT:
        this.rejectMaybeRecommendation(recommendationId);
        break;
      case RecommendationAction.ACCEPT:
        this.acceptMaybeRecommendation(recommendationId);
        break;
      default:
        throw new Error(
          `Unsupported recommendation action for maybe recommendation: ${recommendationAction}`
        );
    }
  }

  public acceptMaybeRecommendation(businessIdToAccept: string) {
    const businessIndex = this.maybeRecommendations.findIndex(
      ({ businessId }) => businessIdToAccept == businessId
    );
    if (businessIndex === -1) {
      throw new Error(
        `Illegal state exception: Attempted to accept recommendation with business id ${businessIdToAccept}, but business not found`
      );
    }

    this.acceptedRecommendations.push(this.maybeRecommendations[businessIndex]);
    this.maybeRecommendations.splice(businessIndex, 1);
    this.completeSession();
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

  private completeSession() {
    this.maybeRecommendations = [];
    this.rejectedRecommendations = [
      ...this.rejectedRecommendations,
      ...this.maybeRecommendations,
    ];
    if (!!this.currentRecommendation) {
      this.rejectedRecommendations.push(this.currentRecommendation);
      this.currentRecommendation = null;
    }
    this.sessionStatus = SearchSessionStatus.COMPLETE;
  }
}
