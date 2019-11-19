import { combineReducers, Action } from '@ngrx/store';

import { IMessage } from './models';
import * as fromReducers from './reducers';

export interface IMessageState {
  readonly messages: { [streamId: string]: IMessage[] };
}

export function reducers(state: IMessageState, action: Action) {
  return combineReducers<IMessageState>({
    messages: fromReducers.messages,
  })(state, action);
}
