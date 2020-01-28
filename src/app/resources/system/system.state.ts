import { Action, combineReducers } from '@ngrx/store';

import { ISystem } from './models';
import * as fromReducers from './reducers';

export interface ISystemState {
  readonly online?: boolean;
  readonly fullscreen?: boolean;
  readonly system?: ISystem;
}

export function reducers(state: ISystemState, action: Action) {
  return combineReducers<ISystemState>({
    online: fromReducers.online,
    fullscreen: fromReducers.fullscreen,
    system: fromReducers.system,
  })(state, action);
}
