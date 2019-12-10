import { Action, combineReducers } from '@ngrx/store';

import { ISystem } from './models';
import * as fromReducers from './reducers';

export interface ISystemState {
  readonly online?: boolean;
  readonly system?: ISystem;
}

export function reducers(state: ISystemState, action: Action) {
  return combineReducers<ISystemState>({
    online: fromReducers.online,
    system: fromReducers.system,
  })(state, action);
}
