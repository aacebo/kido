import { createReducer, on } from '@ngrx/store';

import * as actions from '../../actions';
import { IStream } from '../../models';

export const streams = createReducer<{ [streamId: string]: IStream }>(
  { },
  on(actions.getStreams, (_) => ({ })),
  on(actions.getStreamsFailed, (_) => ({ })),
  on(actions.getStreamsSuccess, (_, a) => {
    const map = { };

    for (const stream of a.streams.sort((one, two) => one.createdAt - two.createdAt)) {
      map[stream._id] = stream;
    }

    return map;
  }),
  on(actions.addStreamSuccess, (_, a) => {
    _[a.stream._id] = a.stream;
    return { ..._ };
  }),
  on(actions.updateStreamSuccess, (_, a) => {
    _[a.stream._id] = a.stream;
    return { ..._ };
  }),
);
