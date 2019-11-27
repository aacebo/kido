import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as actions from '../../actions';
import { StreamType } from '../../enums';
import { IStream } from '../../models';
import * as selectors from '../../stream.selectors';
import { IStreamState } from '../../stream.state';

@Injectable({
  providedIn: 'root',
})
export class StreamService {
  readonly state$: Observable<IStreamState>;
  readonly activeId$: Observable<string | undefined>;
  readonly loading$: Observable<boolean>;
  readonly streams$: Observable<{ [streamId: string]: IStream }>;
  readonly connected$: Observable<{ [streamId: string]: Date }>;
  readonly active$: Observable<IStream | undefined>;
  readonly activeConnected$: Observable<Date>;
  readonly activeConnecting$: Observable<boolean>;
  readonly entities$: Observable<IStream[]>;

  constructor(private readonly _store$: Store<IStreamState>) {
    this.state$ = this._store$.pipe(select(selectors.selectState));
    this.activeId$ = this._store$.pipe(select(selectors.selectActiveId));
    this.loading$ = this._store$.pipe(select(selectors.selectLoading));
    this.streams$ = this._store$.pipe(select(selectors.selectStreams));
    this.connected$ = this._store$.pipe(select(selectors.selectConnected));
    this.active$ = this._store$.pipe(select(selectors.selectActive));
    this.activeConnected$ = this._store$.pipe(select(selectors.selectActiveConnected));
    this.activeConnecting$ = this._store$.pipe(select(selectors.selectActiveConnecting));
    this.entities$ = this._store$.pipe(select(selectors.selectEntities));
  }

  get() {
    this._store$.dispatch(actions.get());
  }

  add(streamType: StreamType, name: string, url?: string, description?: string) {
    this._store$.dispatch(actions.add({ streamType, name, url, description }));
  }

  update(stream: Partial<IStream>) {
    this._store$.dispatch(actions.update({ stream }));
  }

  setActive(streamId: string) {
    this._store$.dispatch(actions.setActive({ streamId }));
  }

  connect(streamId: string, streamType: StreamType, url: string) {
    this._store$.dispatch(actions.connect({ streamId, streamType, url }));
  }

  disconnect(streamId: string) {
    this._store$.dispatch(actions.disconnect({ streamId }));
  }

  remove(streamId: string, _rev: string) {
    this._store$.dispatch(actions.remove({ streamId, _rev }));
  }
}
