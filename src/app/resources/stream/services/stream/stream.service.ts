import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as actions from '../../actions';
import * as selectors from '../../stream.selectors';
import { IStreamState } from '../../stream.state';
import { IStream } from '../../models';
import { StreamType } from '../../enums';

@Injectable({
  providedIn: 'root',
})
export class StreamService {
  readonly state$: Observable<IStreamState>;
  readonly activeId$: Observable<string | undefined>;
  readonly streams$: Observable<{ [streamId: string]: IStream }>;
  readonly connected$: Observable<{ [streamId: string]: boolean }>;
  readonly active$: Observable<IStream | undefined>;
  readonly activeConnected$: Observable<boolean>;
  readonly entities$: Observable<IStream[]>;

  constructor(private readonly _store$: Store<IStreamState>) {
    this.state$ = this._store$.pipe(select(selectors.selectState));
    this.activeId$ = this._store$.pipe(select(selectors.selectActiveId));
    this.streams$ = this._store$.pipe(select(selectors.selectStreams));
    this.connected$ = this._store$.pipe(select(selectors.selectConnected));
    this.active$ = this._store$.pipe(select(selectors.selectActive));
    this.activeConnected$ = this._store$.pipe(select(selectors.selectActiveConnected));
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
}
