import { Action, combineReducers } from '@ngrx/store';

import { IMessage } from './models';
import * as fromReducers from './reducers';

export interface IMessageState {
  readonly activeId?: string;
  readonly messages: { [streamId: string]: IMessage[] };
  readonly loading: { [streamId: string]: boolean };
}

export function reducers(state: IMessageState, action: Action) {
  return combineReducers<IMessageState>({
    activeId: fromReducers.activeId,
    messages: fromReducers.messages,
    loading: fromReducers.loading,
  })(state, action);
}
