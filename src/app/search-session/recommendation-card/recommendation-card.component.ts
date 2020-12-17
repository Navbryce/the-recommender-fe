import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Business } from '../../data/models/Business.interface';
import { Recommendation } from '../../data/models/Recommendation.interface';
import { RecommendationAction } from '../../data/services/SearchService.interface';

@Component({
  selector: 'app-recommendation-card',
  templateUrl: './recommendation-card.component.html',
  styleUrls: ['./recommendation-card.component.scss'],
})
export class RecommendationCardComponent implements OnInit, OnChanges {
  @Input() recommendation: Recommendation;
  @Input() withActions = true;
  @Input() disableReconsider = false;

  @Output() onAction = new EventEmitter<{
    businessId: string;
    action: RecommendationAction;
  }>();

  formattedImages: { url: string }[];

  get recommendedBusiness(): Business {
    return this.recommendation?.business;
  }

  get displayableCategories(): string[] {
    return this.recommendation?.business.categories.map((val) => val.label);
  }

  constructor() {}

  onAcceptRecommendation(): void {
    this.emitAction(RecommendationAction.ACCEPT);
  }

  onRejectCurrentRecommendation(): void {
    this.emitAction(RecommendationAction.REJECT);
  }

  onMaybeRecommendation(): void {
    this.emitAction(RecommendationAction.MAYBE);
  }

  private emitAction(action: RecommendationAction) {
    this.onAction.emit({
      businessId: this.recommendedBusiness.id,
      action,
    });
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.formattedImages = this.recommendation?.business.imageUrls.map(
      (url) => ({ url })
    );
  }
}
