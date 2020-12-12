import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Business } from '../../data/models/Business.interface';
import { Recommendation } from '../../data/models/Recommendation.interface';

@Component({
  selector: 'app-recommendation-card',
  templateUrl: './recommendation-card.component.html',
  styleUrls: ['./recommendation-card.component.scss'],
})
export class RecommendationCardComponent implements OnInit, OnChanges {
  @Input() recommendation: Recommendation;

  formattedImages: { url: string }[];

  get recommendedBusiness(): Business {
    return this.recommendation?.business;
  }

  get displayableCategories(): string[] {
    return this.recommendation?.business.categories.map((val) => val.label);
  }

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.formattedImages = this.recommendation?.business.imageUrls.map(
      (url) => ({ url })
    );
  }
}
