import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ParameterBoxComponent } from './parameter-box/parameter-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RecommendationEngineComponent } from './recommendation-engine/recommendation-engine.component';
import { AppClientModule } from './app-client/app-client.module';
import { SearchSessionModule } from './search-session/search-session.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FlexModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { ErrorHandlerService } from './error-handler.service';
import { MatIconModule } from '@angular/material/icon';
import { RcvModule } from './rcv/rcv.module';
import { RcvCreationComponent } from './rcv/rcv-creation/rcv-creation.component';

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
    AppClientModule,
    SearchSessionModule,
    MatProgressBarModule,
    FlexModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
