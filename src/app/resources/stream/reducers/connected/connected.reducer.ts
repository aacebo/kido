import { createReducer, on } from '@ngrx/store';

import * as actions from '../../actions';

export const connected = createReducer<{ [streamId: string]: Date }>(
  { },
  on(actions.connectSuccess, (_, a) => ({
    ..._,
    [a.streamId]: new Date(),
  })),
  on(actions.disconnect, (_, a) => ({
    ..._,
    [a.streamId]: undefined,
  })),
);
