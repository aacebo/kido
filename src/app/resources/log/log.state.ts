import { combineReducers, Action } from '@ngrx/store';

import { ILog } from './models';
import * as fromReducers from './reducers';

export interface ILogState {
  readonly logs: { [logId: string]: ILog };
}

export function reducers(state: ILogState, action: Action) {
  return combineReducers<ILogState>({
    logs: fromReducers.logs,
  })(state, action);
}
