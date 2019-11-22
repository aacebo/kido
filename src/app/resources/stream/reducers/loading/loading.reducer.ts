import { createReducer, on } from '@ngrx/store';

import * as actions from '../../actions';

export const loading = createReducer<boolean | undefined>(
  undefined,
  on(actions.get, (_) => true),
  on(actions.getSuccess, (_) => false),
  on(actions.getFailed, (_) => false),
);
