import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Alert, AlertService } from '../shared/services/alert.service';
import { concatMap } from 'rxjs/operators';

declare var Swal: any;

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css'],
})
export class AlertDialogComponent implements OnInit {
  constructor(private alertService: AlertService, private ngZone: NgZone) {
    this.alertService.alert$
      .pipe(concatMap((alert) => this.onAlert(alert)))
      .subscribe(() => {});
  }

  private async onAlert(alert: Alert<any>): Promise<void> {
    return new Promise((resolve) => {
      const alertConfig = {
        title: alert.title,
        icon: alert.icon,
        ...alert.specializedAlertConfig,
      };
      this.ngZone.runOutsideAngular(async () => {
        const result = await Swal.fire(alertConfig);
        resolve(result);
        alert.close(result);
      });
    });
  }

  ngOnInit(): void {}
}
