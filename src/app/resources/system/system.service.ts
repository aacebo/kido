import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ISystem } from './models';
import * as actions from './system.actions';
import * as selectors from './system.selectors';
import { ISystemState } from './system.state';

@Injectable({
  providedIn: 'root',
})
export class SystemService {
  readonly state$: Observable<ISystemState>;
  readonly system$: Observable<ISystem>;
  readonly isMac$: Observable<boolean>;

  constructor(private readonly _store$: Store<ISystemState>) {
    this.state$ = this._store$.pipe(select(selectors.selectState));
    this.system$ = this._store$.pipe(select(selectors.selectSystem));
    this.isMac$ = this._store$.pipe(select(selectors.selectIsMac));
  }

  add(system: ISystem) {
    this._store$.dispatch(actions.add({ system }));
  }
}
