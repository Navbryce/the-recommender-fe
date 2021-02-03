import { ErrorHandler, Injectable } from '@angular/core';
import { AlertService } from './shared/services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  AppErrorResponse,
  isAppErrorResponse,
} from './data/services/AppErrorResponse.interface';

type PromiseRejection = {
  rejection: any;
  promise: any;
};

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  constructor(private alertService: AlertService) {}

  handleError(error: any): void {
    console.error(error);

    // unwrap error if uncaught from promise
    if (
      (error as PromiseRejection).rejection &&
      (error as PromiseRejection).promise
    ) {
      error = error.rejection;
    }

    if (error instanceof HttpErrorResponse && error.status === 0) {
      this.alertService.errorAlert(
        'Could not connect',
        'The backend could not be reached. Please try again later.'
      );
      return;
    }
    if (error instanceof HttpErrorResponse && isAppErrorResponse(error.error)) {
      const appError: AppErrorResponse = error.error;
      this.alertService.errorAlert(
        'Unhandled Known Error',
        `${appError.message} (errorCode=${appError.errorCode ?? 'NONE'})`
      );
      return;
    }
    this.alertService.errorAlert('Unknown Error', error.message);
  }
}
