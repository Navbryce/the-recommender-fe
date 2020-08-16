import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputErrorMessageDirective } from './directives/input-error-message.directive';
import { LocationEntryComponent } from './components/location-entry/location-entry.component';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { FilteredAutocompleteComponent } from './components/filtered-autocomplete/filtered-autocomplete.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BooleanIndicatorIconComponent } from './components/boolean-indicator-icon/boolean-indicator-icon.component';
import { UnitConverterPipe } from './pipes/unit-converter.pipe';
import { RoundValuePipe } from './pipes/round-value.pipe';
import { PriceCategoryComponent } from './components/price-category/price-category.component';

@NgModule({
  declarations: [
    InputErrorMessageDirective,
    LocationEntryComponent,
    FilteredAutocompleteComponent,
    BooleanIndicatorIconComponent,
    RoundValuePipe,
    UnitConverterPipe,
    PriceCategoryComponent,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: environment.placesApiKey,
      libraries: ['places'],
    }),
    CommonModule,
    MatButtonModule,
    MatGoogleMapsAutocompleteModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
  ],
  exports: [
    BooleanIndicatorIconComponent,
    InputErrorMessageDirective,
    LocationEntryComponent,
    FilteredAutocompleteComponent,
    PriceCategoryComponent,
    RoundValuePipe,
    UnitConverterPipe,
  ],
})
export class SharedModule {}
