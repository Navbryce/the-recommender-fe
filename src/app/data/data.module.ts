import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestService } from './services/request.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [RequestService, UserService],
})
export class DataModule {}
