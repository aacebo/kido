import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import ua from 'universal-analytics';

import { environment } from '../../../../environments/environment';
import { ElectronService } from '../electron';

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  readonly error$ = new Subject<Error>();

  private readonly _ua: ua.Visitor;

  constructor(private readonly _electronService: ElectronService) {
    this._ua = this._electronService.getGlobal('ua')(environment.googleAnalyticsTrackingId);
  }

  pageView(path: string | ua.PageviewParams) {
    if (navigator.onLine) {
      this._ua.pageview(path, this._onComplete.bind(this));
    }
  }

  exception(ex: string | ua.ExceptionParams) {
    if (navigator.onLine) {
      this._ua.exception(ex, this._onComplete.bind(this));
    }
  }

  private _onComplete(err?: Error) {
    if (err) {
      this.error$.next(err);
    }
  }
}
