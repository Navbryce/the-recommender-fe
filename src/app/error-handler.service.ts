import { ErrorHandler, Injectable } from '@angular/core';
import { AlertService } from './shared/services/alert.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  constructor(private alertService: AlertService) {}

  handleError(error: any): void {
    this.alertService.errorAlert('Unknown Error', error.message);
    console.error(error);
  }
}
