import { createReducer, on } from '@ngrx/store';

import * as actions from '../../actions';

export const activeStreamId = createReducer<string | undefined>(
  undefined,
  on(actions.setActive, (_, a) => a.streamId),
  on(actions.addStreamSuccess, (_, a) => a.stream._id),
  on(actions.getStreamsSuccess, (_, a) => a.streams.length > 0 ? a.streams[0]._id : undefined),
);
