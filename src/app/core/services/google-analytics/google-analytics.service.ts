import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import ua from 'universal-analytics';

import { ElectronService } from '../electron';

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  readonly error$ = new Subject<Error>();

  private readonly _ua: ua.Visitor;

  constructor(private readonly _electronService: ElectronService) {
    this._ua = this._electronService.getGlobal('ua')('UA-156265478-1');
  }

  pageView(path: string) {
    this._ua.pageview(path, this._onComplete.bind(this));
  }

  exception(ex: string) {
    this._ua.exception(ex, this._onComplete.bind(this));
  }

  private _onComplete(err?: Error) {
    if (err) {
      this.error$.next(err);
    }
  }
}
