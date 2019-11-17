import { createReducer, on } from '@ngrx/store';

import * as actions from '../../actions';

export const streamConnected = createReducer<{ [streamId: string]: boolean }>(
  { },
  on(actions.connectStreamSuccess, (_, a) => ({
    ..._,
    [a.streamId]: true,
  })),
  on(actions.disconnectStream, (_, a) => ({
    ..._,
    [a.streamId]: false,
  })),
);
