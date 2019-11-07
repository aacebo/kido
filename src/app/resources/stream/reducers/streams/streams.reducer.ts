import { createReducer, on } from '@ngrx/store';

import * as actions from '../../actions';
import { IStream } from '../../models';

export const streams = createReducer<IStream[]>(
  [],
  on(actions.getStreams, (_) => []),
  on(actions.getStreamsFailed, (_) => []),
  on(actions.getStreamsSuccess, (_, a) => a.streams),
  on(actions.addStreamSuccess, (_, a) => [..._, a.stream]),
);
