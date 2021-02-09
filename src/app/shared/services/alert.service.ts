import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

export interface Alert<T> {
  title?: string;
  icon: string;
  close?: ($event: AlertResult<T>) => void;
  specializedAlertConfig: MessageAlert | InputAlert;
}

export interface MessageAlert {
  text: string;
}

export class InputAlert {
  input: string;
  inputLabel: string;
  inputPlaceHolder: string;
  inputValidator: InputValidator;
}

export type InputValidator = (string: string) => string | null;

export interface AlertResult<T> {
  isConfirmed: boolean;
  isDenied: boolean;
  isDismissed: boolean;
  value: T;
  dismiss: string;
}

export type DialogResult = AlertResult<boolean>;

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertSubject = new ReplaySubject<Alert<any>>();
  public readonly alert$: Observable<
    Alert<any>
  > = this.alertSubject.asObservable();

  public warnAlert(title: string, message: string): Promise<DialogResult> {
    return new Promise<DialogResult>((resolve) =>
      this.alertSubject.next({
        title,
        specializedAlertConfig: { text: message },
        icon: 'warning',
        close: resolve,
      })
    );
  }

  public errorAlert(
    title: string,
    errorMessage: string
  ): Promise<DialogResult> {
    return new Promise<DialogResult>((resolve) =>
      this.alertSubject.next({
        title,
        specializedAlertConfig: { text: errorMessage },
        icon: 'error',
        close: resolve,
      })
    );
  }

  public inputTextAlert(
    title: string,
    inputLabel: string,
    inputPlaceHolder: string,
    inputValidator: InputValidator
  ): Promise<AlertResult<string>> {
    return new Promise<AlertResult<string>>((resolve) =>
      this.alertSubject.next({
        title,
        specializedAlertConfig: {
          input: 'text',
          inputLabel,
          inputPlaceHolder,
          inputValidator,
        },
        icon: 'error',
        close: resolve,
      })
    );
  }
}
