import { createReducer, on } from '@ngrx/store';

import * as actions from '../../update.actions';

export const checking = createReducer<boolean | undefined>(
  undefined,
  on(actions.checking, (_) => true),
  on(actions.available, (_) => false),
);
