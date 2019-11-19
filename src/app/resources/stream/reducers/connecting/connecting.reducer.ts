import { createReducer, on } from '@ngrx/store';

import * as actions from '../../actions';

export const connecting = createReducer<{ [streamId: string]: boolean }>(
  { },
  on(actions.connect, (_, a) => ({
    ..._,
    [a.streamId]: true,
  })),
  on(actions.connectSuccess, (_, a) => ({
    ..._,
    [a.streamId]: false,
  })),
  on(actions.connectFailed, (_, a) => ({
    ..._,
    [a.streamId]: false,
  })),
);
