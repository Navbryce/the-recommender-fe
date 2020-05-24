import { Component, OnInit } from '@angular/core';
import { PriceCategory, toPriceCategoryString } from '../../data/PriceCategory.enum';

@Component({
  selector: 'app-parameter-box',
  templateUrl: './parameter-box.component.html',
  styleUrls: ['./parameter-box.component.scss']
})
export class ParameterBoxComponent implements OnInit {
  readonly priceCategoryValues: PriceCategory[] = <PriceCategory[]> Object.keys(PriceCategory);
  readonly toPriceCategoryString = toPriceCategoryString;

  constructor() { }

  ngOnInit(): void {
  }

}
