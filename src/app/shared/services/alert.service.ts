import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

export interface Alert {
  title?: string;
  message: string;
  icon: string;
  close?: ($event) => void;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertSubject = new ReplaySubject<Alert>();
  public readonly alert$: Observable<Alert> = this.alertSubject.asObservable();

  public warnAlert(title: string, message: string, onClose?: ($event) => void) {
    this.alertSubject.next({
      title,
      message,
      icon: 'warning',
      close: onClose,
    });
  }

  public errorAlert(
    title: string,
    errorMessage: string,
    onClose?: ($event) => void
  ) {
    this.alertSubject.next({
      title,
      message: errorMessage,
      icon: 'error',
      close: onClose,
    });
  }

  public alert(alert: Alert) {
    this.alertSubject.next(alert);
  }
}
