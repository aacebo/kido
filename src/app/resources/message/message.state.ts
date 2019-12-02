import { Action, combineReducers } from '@ngrx/store';

import { IMessage } from './models';
import * as fromReducers from './reducers';

export interface IMessageState {
  readonly activeId?: string;
  readonly messages: { [streamId: string]: IMessage[] };
}

export function reducers(state: IMessageState, action: Action) {
  return combineReducers<IMessageState>({
    activeId: fromReducers.activeId,
    messages: fromReducers.messages,
  })(state, action);
}
