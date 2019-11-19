import { createReducer, on } from '@ngrx/store';

import * as actions from '../../actions';

export const connected = createReducer<{ [streamId: string]: boolean }>(
  { },
  on(actions.connectSuccess, (_, a) => ({
    ..._,
    [a.streamId]: true,
  })),
  on(actions.disconnect, (_, a) => ({
    ..._,
    [a.streamId]: false,
  })),
);
