import { createReducer, on } from '@ngrx/store';

import * as actions from '../../actions';

export const loading = createReducer<{ [streamId: string]: boolean }>(
  { },
  on(actions.get, (_, a) => ({
    ..._,
    [a.streamId]: true,
  })),
  on(actions.getFailed, (_, a) => ({
    ..._,
    [a.streamId]: false,
  })),
  on(actions.getSuccess, (_, a) => ({
    ..._,
    [a.streamId]: false,
  })),
);
