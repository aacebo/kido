import { createReducer, on } from '@ngrx/store';

import * as actions from '../../actions';

export const activeId = createReducer<string | undefined>(
  undefined,
  on(actions.setActive, (_, a) => a.streamId),
  on(actions.addSuccess, (_, a) => a.stream._id),
  on(actions.getSuccess, (_, a) => a.streams.length > 0 ? a.streams[0]._id : undefined),
);
