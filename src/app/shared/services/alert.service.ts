import { Inject, Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { AUTH_SERVICE_TOKEN } from '../../data/services/service-injection-tokens';
import { AuthService } from '../../data/services/AuthService.interface';
import { User } from '../../data/models/User.class';

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
  inputPlaceholder: string;
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

  constructor(@Inject(AUTH_SERVICE_TOKEN) private authService: AuthService) {}

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

  public async errorAlert(
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

  public async registerBasicUserAlert(): Promise<User | null> {
    const { value: name }: { value: string } = await this.inputTextAlert({
      title: 'What is your name?',
      inputPlaceholder: 'Your Name',
      inputValidator: (value) =>
        value.length > 0 ? null : 'Input must be at least 1 character',
    });
    if (!name) {
      return null;
    }

    return this.authService.registerBasicUser(name).toPromise();
  }

  public async inputTextAlert({
    title,
    inputLabel,
    inputPlaceholder,
    inputValidator,
  }: {
    title: string;
    inputLabel?: string;
    inputPlaceholder?: string;
    inputValidator?: InputValidator;
  }): Promise<AlertResult<string>> {
    return new Promise<AlertResult<string>>((resolve) =>
      this.alertSubject.next({
        title,
        specializedAlertConfig: {
          input: 'text',
          inputLabel,
          inputPlaceholder,
          inputValidator,
        },
        icon: 'question',
        close: resolve,
      })
    );
  }
}
