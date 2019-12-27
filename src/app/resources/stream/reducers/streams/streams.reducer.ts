import { createReducer, on } from '@ngrx/store';

import * as actions from '../../actions';
import { IStream } from '../../models';

export const streams = createReducer<{ [streamId: string]: IStream }>(
  { },
  on(actions.get, (_) => ({ })),
  on(actions.getFailed, (_) => ({ })),
  on(actions.getSuccess, (_, a) => {
    const map = { };

    for (const stream of a.streams) {
      map[stream._id] = stream;
    }

    return map;
  }),
  on(actions.addSuccess, (_, a) => {
    const state = { ..._ };
    state[a.stream._id] = a.stream;
    return state;
  }),
  on(actions.updateSuccess, (_, a) => {
    const state = { ..._ };
    state[a.stream._id] = a.stream;
    return state;
  }),
  on(actions.removeSuccess, (_, a) => {
    const state = { ..._ };
    state[a.streamId] = undefined;
    delete state[a.streamId];
    return state;
  }),
);
