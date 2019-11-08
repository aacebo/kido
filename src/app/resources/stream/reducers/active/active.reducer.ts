import { createReducer, on } from '@ngrx/store';

import * as actions from '../../actions';

export const active = createReducer<string | undefined>(
  undefined,
  on(actions.setActive, (_, a) => a.streamId),
  on(actions.addStreamSuccess, (_, a) => a.stream._id),
  on(actions.getStreamsSuccess, (_, a) => a.streams.length > 0 ? a.streams[a.streams.length - 1]._id : undefined),
);
