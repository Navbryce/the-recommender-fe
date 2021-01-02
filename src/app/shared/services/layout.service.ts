import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable, ReplaySubject } from 'rxjs';
import { VIEW_CONFIG } from '../../view-config.const';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  public desktop$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.desktop$ = breakpointObserver
      .observe([`(min-width: ${VIEW_CONFIG.mobileConstraint}px`])
      .pipe(map((result) => result.matches));
  }
}
