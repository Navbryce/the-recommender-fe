import { Component, OnInit, ViewChild } from '@angular/core';
import { Alert, AlertService } from '../shared/services/alert.service';
import { concatMap, switchMap } from 'rxjs/operators';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css'],
})
export class AlertDialogComponent implements OnInit {
  public currentAlertConfig: {
    title?: string;
    text: string;
    icon: string;
    close: ($event) => void;
  } = {
    title: 'initial',
    text: 'initial',
    icon: 'initial',
    close: null,
  };

  @ViewChild('swal') swal: SwalComponent;

  constructor(private alertService: AlertService) {
    this.alertService.alert$
      .pipe(concatMap((alert) => this.onAlert(alert)))
      .subscribe(() => {});
  }

  private onAlert(alert: Alert): Promise<void> {
    return new Promise((resolve) => {
      this.currentAlertConfig = {
        title: alert.title,
        text: alert.message,
        icon: alert.icon,
        close: ($event) => {
          resolve();
          if (alert.close) {
            alert.close($event);
          }
        },
      };
      // currently a workaround to force the config changes to be used
      this.swal.title = this.currentAlertConfig.title;
      this.swal.text = this.currentAlertConfig.text;
      this.swal.icon = alert.icon as SweetAlertIcon;
      this.swal.close.subscribe(($event) =>
        this.currentAlertConfig.close($event)
      );
      this.swal.fire();
    });
  }

  ngOnInit(): void {}
}
