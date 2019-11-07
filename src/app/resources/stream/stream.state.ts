import { combineReducers, Action } from '@ngrx/store';

import { IStream, IStreamMessage } from './models';
import * as fromReducers from './reducers';

export interface IStreamState {
  readonly streams: IStream[];
  readonly streamMessages: { [streamId: string]: IStreamMessage[] };
}

export function reducers(state: IStreamState, action: Action) {
  return combineReducers<IStreamState>({
    streams: fromReducers.streams,
    streamMessages: fromReducers.streamMessages,
  })(state, action);
}
