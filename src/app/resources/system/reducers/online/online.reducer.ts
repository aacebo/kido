import { createReducer, on } from '@ngrx/store';

import * as actions from '../../actions';

export const online = createReducer<boolean | undefined>(
  undefined,
  on(actions.setOnline, (_, a) => a.online),
);
