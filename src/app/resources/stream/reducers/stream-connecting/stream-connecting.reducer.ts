import { createReducer, on } from '@ngrx/store';

import * as actions from '../../actions';

export const streamConnecting = createReducer<{ [streamId: string]: boolean }>(
  { },
  on(actions.connectStream, (_, a) => ({
    ..._,
    [a.streamId]: true,
  })),
  on(actions.connectStreamSuccess, (_, a) => ({
    ..._,
    [a.streamId]: false,
  })),
  on(actions.connectStreamFailed, (_, a) => ({
    ..._,
    [a.streamId]: false,
  })),
);
