import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as actions from './update.actions';
import * as selectors from './update.selectors';
import { IUpdateState } from './update.state';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  readonly state$: Observable<IUpdateState>;
  readonly checking$: Observable<boolean | undefined>;
  readonly available$: Observable<boolean | undefined>;

  constructor(private readonly _store$: Store<IUpdateState>) {
    this.state$ = this._store$.pipe(select(selectors.selectState));
    this.checking$ = this._store$.pipe(select(selectors.selectChecking));
    this.available$ = this._store$.pipe(select(selectors.selectAvailable));
  }

  checking() {
    this._store$.dispatch(actions.checking());
  }

  available(available = true) {
    this._store$.dispatch(actions.available({ available }));
  }
}
