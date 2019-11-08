import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as actions from '../../actions';
import * as selectors from '../../stream.selectors';
import { IStreamState } from '../../stream.state';
import { IStream, IStreamMessage } from '../../models';
import { StreamType, StreamMessageType } from '../../enums';

@Injectable({
  providedIn: 'root',
})
export class StreamService {
  readonly state$: Observable<IStreamState>;
  readonly active$: Observable<string | undefined>;
  readonly streams$: Observable<IStream[]>;
  readonly streamMessages$: Observable<{ [streamId: string]: IStreamMessage[] }>;
  readonly activeStream$: Observable<IStream | undefined>;

  constructor(private readonly _store$: Store<IStreamState>) {
    this.state$ = this._store$.pipe(select(selectors.selectState));
    this.active$ = this._store$.pipe(select(selectors.selectActive));
    this.streams$ = this._store$.pipe(select(selectors.selectStreams));
    this.streamMessages$ = this._store$.pipe(select(selectors.selectStreamMessages));
    this.activeStream$ = this._store$.pipe(select(selectors.selectActiveStream));
  }

  getStreams() {
    this._store$.dispatch(actions.getStreams());
  }

  getMessages() {
    this._store$.dispatch(actions.getMessages());
  }

  addStream(streamType: StreamType, name: string, url?: string, description?: string) {
    this._store$.dispatch(actions.addStream({
      streamType,
      name,
      url,
      description,
    }));
  }

  addMessage(streamId: string, messageType: StreamMessageType, content: any) {
    this._store$.dispatch(actions.addMessage({
      streamId,
      messageType,
      content,
    }));
  }

  setActive(streamId: string) {
    this._store$.dispatch(actions.setActive({ streamId }));
  }
}
