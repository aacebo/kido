import { combineReducers, Action } from '@ngrx/store';

import { IStream } from './models';
import * as fromReducers from './reducers';

export interface IStreamState {
  readonly activeId?: string;
  readonly streams: { [streamId: string]: IStream };
  readonly connected: { [streamId: string]: boolean };
  readonly connecting: { [streamId: string]: boolean };
}

export function reducers(state: IStreamState, action: Action) {
  return combineReducers<IStreamState>({
    activeId: fromReducers.activeId,
    streams: fromReducers.streams,
    connected: fromReducers.connected,
    connecting: fromReducers.connecting,
  })(state, action);
}
