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
import { convert } from '../shared/pipes/unit-converter.pipe';

@Component({
  selector: 'app-parameter-box',
  templateUrl: './parameter-box.component.html',
  styleUrls: ['./parameter-box.component.scss'],
})
export class ParameterBoxComponent implements OnInit {
  readonly ATTRIBUTE_OPTIONS = ['test', 'test option 2'];
  readonly DEFAULT_RADIUS = 5;
  readonly INPUT_UNIT = 'mi';
  readonly TARGET_UNIT = 'm';
  readonly MAX_RADIUS = convert(40000, this.TARGET_UNIT, this.INPUT_UNIT);

  readonly priceCategoryValues: PriceCategory[] = Object.keys(
    PriceCategory
  ).filter((category) => category !== PriceCategory.FREE) as PriceCategory[];
  readonly toPriceCategoryString = toPriceCategoryString;

  searchParametersFormGroup: FormGroup;

  @Output('searchParameters') searchParametersEmitter: EventEmitter<
    BusinessSearchParameters
  > = new EventEmitter<BusinessSearchParameters>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.searchParametersFormGroup = this.formBuilder.group({
      location: ['', Validators.required],
      priceCategories: [''],
      searchTerm: [''],
      attributes: [''],
      searchRadius: [this.DEFAULT_RADIUS, Validators.max(40)],
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

    return {
      ...form.value,
      searchRadius: convert(
        form.value.searchRadius,
        this.INPUT_UNIT,
        this.TARGET_UNIT
      ),
    };
  }
}
