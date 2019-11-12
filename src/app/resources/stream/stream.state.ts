import { combineReducers, Action } from '@ngrx/store';

import { IStream, IStreamMessage } from './models';
import * as fromReducers from './reducers';

export interface IStreamState {
  readonly activeStreamId?: string;
  readonly streams: { [streamId: string]: IStream };
  readonly streamMessages: { [streamId: string]: IStreamMessage[] };
  readonly streamConnected: { [streamId: string]: boolean };
}

export function reducers(state: IStreamState, action: Action) {
  return combineReducers<IStreamState>({
    activeStreamId: fromReducers.activeStreamId,
    streams: fromReducers.streams,
    streamMessages: fromReducers.streamMessages,
    streamConnected: fromReducers.streamConnected,
  })(state, action);
}
