import { combineReducers, Action } from '@ngrx/store';

import * as fromReducers from './reducers';
import { ISystem } from './models';

export interface ISystemState {
  readonly system?: ISystem;
}

export function reducers(state: ISystemState, action: Action) {
  return combineReducers<ISystemState>({
    system: fromReducers.system,
  })(state, action);
}
