import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  PriceCategory,
  toPriceCategoryString,
} from '../data/models/PriceCategory.enum';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { BusinessSearchParameters } from '../data/models/BusinessSearchParameters.interface';
import { convert } from '../shared/pipes/unit-converter.pipe';
import { SearchSessionParameters } from '../data/models/SearchSessionParameters.interface';

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
    SearchSessionParameters
  > = new EventEmitter<SearchSessionParameters>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.searchParametersFormGroup = this.formBuilder.group({
      businessSearchParameters: this.formBuilder.group({
        location: ['', Validators.required],
        priceCategories: [''],
        searchTerm: [''],
        attributes: [''],
        searchRadius: [this.DEFAULT_RADIUS, Validators.max(this.MAX_RADIUS)],
      }),
      dinnerPartyActiveId: [''],
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
  ): SearchSessionParameters {
    if (!form.valid) {
      throw new Error('Form must be valid');
    }

    const businessSearchParameters: BusinessSearchParameters =
      form.value.businessSearchParameters;
    return {
      dinnerPartyActiveId:
        form.value.dinnerPartyActiveId.length != 0
          ? form.value.dinnerPartyActiveId
          : null,
      businessSearchParameters: {
        ...businessSearchParameters,
        searchRadius: convert(
          businessSearchParameters.searchRadius,
          this.INPUT_UNIT,
          this.TARGET_UNIT
        ),
      },
    };
  }
}
