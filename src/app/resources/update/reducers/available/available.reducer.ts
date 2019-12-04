import { createReducer, on } from '@ngrx/store';

import * as actions from '../../update.actions';

export const available = createReducer<boolean | undefined>(
  undefined,
  on(actions.checking, (_) => undefined),
  on(actions.available, (_, a) => a.available),
);
