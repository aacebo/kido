import * as electron from 'electron';
import * as ua from 'universal-analytics';
import { Subject } from 'rxjs';

export class KidoGoogleAnalytics {
  readonly error$ = new Subject<Error>();

  private readonly _visitor: ua.Visitor;

  constructor() {
    this._visitor = ua('UA-156265478-1');

    electron.ipcMain.on('ga.pageview', (_, page: string) => {
      this._visitor.pageview(page, this._onComplete.bind(this));
    });

    electron.ipcMain.on('ga.exception', (_, ex: string) => {
      this._visitor.exception(ex, this._onComplete.bind(this));
    });
  }

  private _onComplete(err?: Error) {
    if (err) {
      this.error$.next(err);
    }
  }
}
