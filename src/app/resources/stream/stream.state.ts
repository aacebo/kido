import { combineReducers, Action } from '@ngrx/store';

import { IStream } from './models';
import * as fromReducers from './reducers';

export interface IStreamState {
  readonly activeStreamId?: string;
  readonly streams: { [streamId: string]: IStream };
  readonly streamConnected: { [streamId: string]: boolean };
  readonly streamConnecting: { [streamId: string]: boolean };
}

export function reducers(state: IStreamState, action: Action) {
  return combineReducers<IStreamState>({
    activeStreamId: fromReducers.activeStreamId,
    streams: fromReducers.streams,
    streamConnected: fromReducers.streamConnected,
    streamConnecting: fromReducers.streamConnecting,
  })(state, action);
}
