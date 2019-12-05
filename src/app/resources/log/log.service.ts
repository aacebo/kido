import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as actions from './log.actions';
import * as selectors from './log.selectors';
import { ILogState } from './log.state';
import { ILog } from './models';
import { LogType } from './enums';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  readonly state$: Observable<ILogState>;
  readonly logs$: Observable<{ [createdAt: number]: ILog }>;
  readonly entities$: Observable<ILog[]>;

  constructor(private readonly _store$: Store<ILogState>) {
    this.state$ = this._store$.pipe(select(selectors.selectState));
    this.logs$ = this._store$.pipe(select(selectors.selectLogs));
    this.entities$ = this._store$.pipe(select(selectors.selectEntities));
  }

  create(message: any, logType = LogType.Info) {
    this._store$.dispatch(actions.create({ logType, message }));
  }
}
