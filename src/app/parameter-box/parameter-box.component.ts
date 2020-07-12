import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  PriceCategory,
  toPriceCategoryString,
} from '../data/models/PriceCategory.enum';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { BusinessSearchParameters } from '../data/models/BusinessSearchParameters.interface';

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

  searchParametersFormGroup: FormGroup;

  @Output() searchParametersEmitter: EventEmitter<
    BusinessSearchParameters
  > = new EventEmitter<BusinessSearchParameters>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.searchParametersFormGroup = this.formBuilder.group({
      location: ['', Validators.required],
      price: [''],
      searchTerm: [''],
      attributes: [''],
      radius: [''],
    });
  }

  onFormSubmit(form: FormGroupDirective) {
    if (form.valid) {
      this.searchParametersEmitter.emit(this.generateSearchParameters(form));
    } else {
      this.searchParametersFormGroup.markAllAsTouched();
    }
  }

  private generateSearchParameters(
    form: FormGroupDirective
  ): BusinessSearchParameters {
    if (!form.valid) {
      throw new Error('Form must be valid');
    }

    return form.value;
  }
}
