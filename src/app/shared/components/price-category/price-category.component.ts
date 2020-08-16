import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  PriceCategory,
  toPriceCategoryMagnitude,
} from '../../../data/models/PriceCategory.enum';

@Component({
  selector: 'app-price-category',
  templateUrl: './price-category.component.html',
  styleUrls: ['./price-category.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceCategoryComponent implements OnInit {
  @Input() priceCategory: PriceCategory;

  get priceCategoryMagnitudeAsArray(): Iterable<number> {
    return Array(toPriceCategoryMagnitude(this.priceCategory)).keys();
  }

  constructor() {}

  ngOnInit(): void {}
}
