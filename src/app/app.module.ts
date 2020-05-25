import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RecommendationEngineComponent } from './recommendation-engine/recommendation-engine.component';
import { ParameterBoxComponent } from './parameter-box/parameter-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FilteredAutocompleteDirective } from './directives/filtered-autocomplete.directive';
import {ReactiveFormsModule} from '@angular/forms';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';
import {AgmCoreModule} from '@agm/core';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    RecommendationEngineComponent,
    ParameterBoxComponent,
    FilteredAutocompleteDirective
  ],
  imports: [
    AgmCoreModule.forRoot({apiKey: environment.PLACES_API_KEY, libraries: ['places']}),
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatSidenavModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatGoogleMapsAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
