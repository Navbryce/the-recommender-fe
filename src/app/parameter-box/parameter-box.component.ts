import { Component, OnInit } from '@angular/core';
import { PriceCategory, toPriceCategoryString } from '../../data/PriceCategory.enum';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-parameter-box',
  templateUrl: './parameter-box.component.html',
  styleUrls: ['./parameter-box.component.scss']
})
export class ParameterBoxComponent implements OnInit {
  readonly attributeOptions = ['test', 'test option 2'];
  readonly priceCategoryValues: PriceCategory[] = Object.keys(PriceCategory) as PriceCategory[];

  readonly toPriceCategoryString = toPriceCategoryString;

  filteredAttributes: any[];
  parameterForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.parameterForm = formBuilder.group( {
      price: [''],
      searchTerm: [''],
      attributes: [''],
      radius: ['']
    });
  }

  ngOnInit(): void {
  }

}
