import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ISystemState } from './system.state';
import { ISystem } from './models';
import * as actions from './actions';
import * as selectors from './system.selectors';

@Injectable({
  providedIn: 'root',
})
export class SystemService {
  readonly state$: Observable<ISystemState>;
  readonly system$: Observable<ISystem | undefined>;
  readonly isMac$: Observable<boolean>;
  readonly online$: Observable<boolean | undefined>;
  readonly fullscreen$: Observable<boolean | undefined>;

  constructor(private readonly _store$: Store<ISystemState>) {
    this.state$ = this._store$.pipe(select(selectors.selectState));
    this.system$ = this._store$.pipe(select(selectors.selectSystem));
    this.isMac$ = this._store$.pipe(select(selectors.selectIsMac));
    this.online$ = this._store$.pipe(select(selectors.selectOnline));
    this.fullscreen$ = this._store$.pipe(select(selectors.selectFullscreen));
  }

  setSystem(system: ISystem) {
    this._store$.dispatch(actions.setSystem({ system }));
  }

  setOnline(online: boolean, notify?: boolean) {
    this._store$.dispatch(actions.setOnline({ online, notify }));
  }

  setFullscreen(fullscreen: boolean) {
    this._store$.dispatch(actions.setFullscreen({ fullscreen }));
  }
}
