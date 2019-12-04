import { Action, combineReducers } from '@ngrx/store';

import * as fromReducers from './reducers';

export interface IUpdateState {
  readonly available?: boolean;
  readonly checking?: boolean;
}

export function reducers(state: IUpdateState, action: Action) {
  return combineReducers<IUpdateState>({
    available: fromReducers.available,
    checking: fromReducers.checking,
  })(state, action);
}
