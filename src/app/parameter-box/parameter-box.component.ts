import { Component, OnInit } from '@angular/core';
import {
  PriceCategory,
  toPriceCategoryString,
} from '../../data/PriceCategory.enum';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-parameter-box',
  templateUrl: './parameter-box.component.html',
  styleUrls: ['./parameter-box.component.scss'],
})
export class ParameterBoxComponent implements OnInit {
  readonly attributeOptions = ['test', 'test option 2'];
  readonly priceCategoryValues: PriceCategory[] = Object.keys(
    PriceCategory
  ) as PriceCategory[];

  readonly toPriceCategoryString = toPriceCategoryString;

  filteredAttributes: any[];
  parameterForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.parameterForm = formBuilder.group({
      location: ['', Validators.required],
      price: [''],
      searchTerm: [''],
      attributes: [''],
      radius: [''],
    });
  }

  ngOnInit(): void {}

  formSubmitEventHandler(formSubmitEvent: NgForm) {
    if (formSubmitEvent.valid) {
      console.log(formSubmitEvent);
    }
  }
}
