import { NgModule } from '@angular/core';
import { RcvOverviewComponent } from './rcv-overview/rcv-overview.component';
import { RcvCreationComponent } from './rcv-creation/rcv-creation.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [RcvOverviewComponent, RcvCreationComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    FlexModule,
    MatButtonModule,
  ],
})
export class RcvModule {}
