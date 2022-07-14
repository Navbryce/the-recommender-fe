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
import { RcvVoteComponent } from './rcv-vote/rcv-vote.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SearchSessionModule } from '../search-session/search-session.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { RcvWaitComponent } from './rcv-wait/rcv-wait.component';
import { RcvResultsComponent } from './rcv-results/rcv-results.component';

@NgModule({
  declarations: [
    RcvOverviewComponent,
    RcvCreationComponent,
    RcvVoteComponent,
    RcvWaitComponent,
    RcvResultsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    FlexModule,
    MatButtonModule,
    DragDropModule,
    SearchSessionModule,
    MatIconModule,
    MatDividerModule,
  ],
})
export class RcvModule {}
