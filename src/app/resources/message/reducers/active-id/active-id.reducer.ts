import { createReducer, on } from '@ngrx/store';

import * as actions from '../../actions';

export const activeId = createReducer<string | undefined>(
  undefined,
  on(actions.setActive, (_, a) => a.messageId),
);
