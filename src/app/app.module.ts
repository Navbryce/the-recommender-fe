import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ParameterBoxComponent } from './parameter-box/parameter-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RecommendationEngineComponent } from './recommendation-engine/recommendation-engine.component';
import { SearchClientModule } from './search-client/search-client.module';
import { SearchSessionModule } from './search-session/search-session.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FlexModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';

export function provideSwal() {
  return import('sweetalert2/src/sweetalert2.js'); // instead of import('sweetalert2')
}

@NgModule({
  declarations: [
    AppComponent,
    ParameterBoxComponent,
    RecommendationEngineComponent,
    AlertDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    SharedModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    SearchClientModule,
    SearchSessionModule,
    MatProgressBarModule,
    FlexModule,
    AppRoutingModule,
    SweetAlert2Module.forRoot({
      provideSwal,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
