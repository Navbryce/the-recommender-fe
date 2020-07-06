import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RecommendationEngineComponent } from './recommendation-engine/recommendation-engine.component';
import { ParameterBoxComponent } from './parameter-box/parameter-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FilteredAutocompleteDirective } from './shared/directives/filtered-autocomplete.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../environments/environment';
import { LocationEntryComponent } from './shared/components/location-entry/location-entry.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { InputErrorMessageDirective } from './shared/directives/input-error-message.directive';

@NgModule({
  declarations: [
    AppComponent,
    RecommendationEngineComponent,
    ParameterBoxComponent,
    FilteredAutocompleteDirective,
    LocationEntryComponent,
    InputErrorMessageDirective,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: environment.PLACES_API_KEY,
      libraries: ['places'],
    }),
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatSidenavModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatGoogleMapsAutocompleteModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatChipsModule,
    MatCardModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
