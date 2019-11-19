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
  readonly activeStreamId$: Observable<string | undefined>;
  readonly streams$: Observable<{ [streamId: string]: IStream }>;
  readonly streamConnected$: Observable<{ [streamId: string]: boolean }>;
  readonly activeStream$: Observable<IStream | undefined>;
  readonly activeStreamConnected$: Observable<boolean>;
  readonly entities$: Observable<IStream[]>;

  constructor(private readonly _store$: Store<IStreamState>) {
    this.state$ = this._store$.pipe(select(selectors.selectState));
    this.activeStreamId$ = this._store$.pipe(select(selectors.selectActiveStreamId));
    this.streams$ = this._store$.pipe(select(selectors.selectStreams));
    this.streamConnected$ = this._store$.pipe(select(selectors.selectStreamConnected));
    this.activeStream$ = this._store$.pipe(select(selectors.selectActiveStream));
    this.activeStreamConnected$ = this._store$.pipe(select(selectors.selectActiveStreamConnected));
    this.entities$ = this._store$.pipe(select(selectors.selectEntities));
  }

  getStreams() {
    this._store$.dispatch(actions.getStreams());
  }

  addStream(streamType: StreamType, name: string, url?: string, description?: string) {
    this._store$.dispatch(actions.addStream({ streamType, name, url, description }));
  }

  updateStream(stream: Partial<IStream>) {
    this._store$.dispatch(actions.updateStream({ stream }));
  }

  setActive(streamId: string) {
    this._store$.dispatch(actions.setActive({ streamId }));
  }

  connect(streamId: string, streamType: StreamType, url: string) {
    this._store$.dispatch(actions.connectStream({ streamId, streamType, url }));
  }

  disconnect(streamId: string) {
    this._store$.dispatch(actions.disconnectStream({ streamId }));
  }
}
