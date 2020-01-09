import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as actions from '../../actions';
import * as selectors from '../../stream.selectors';
import { StreamType } from '../../enums';
import { IStream, IStreamListener } from '../../models';
import { IStreamState } from '../../stream.state';

@Injectable({
  providedIn: 'root',
})
export class StreamService {
  readonly state$: Observable<IStreamState>;
  readonly loading$: Observable<boolean>;
  readonly streams$: Observable<{ [streamId: string]: IStream }>;
  readonly connecting$: Observable<{ [streamId: string]: boolean }>;
  readonly connected$: Observable<{ [streamId: string]: Date }>;
  readonly entities$: Observable<IStream[]>;

  constructor(private readonly _store$: Store<IStreamState>) {
    this.state$ = this._store$.pipe(select(selectors.selectState));
    this.loading$ = this._store$.pipe(select(selectors.selectLoading));
    this.streams$ = this._store$.pipe(select(selectors.selectStreams));
    this.connecting$ = this._store$.pipe(select(selectors.selectConnecting));
    this.connected$ = this._store$.pipe(select(selectors.selectConnected));
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

  connect(streamId: string, streamType: StreamType, url: string, listeners?: IStreamListener[]) {
    this._store$.dispatch(actions.connect({ streamId, streamType, url, listeners }));
  }

  disconnect(streamId: string) {
    this._store$.dispatch(actions.disconnect({ streamId }));
  }

  remove(streamId: string, _rev: string) {
    this._store$.dispatch(actions.remove({ streamId, _rev }));
  }
}
