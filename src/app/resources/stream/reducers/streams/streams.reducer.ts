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
    _[a.stream._id] = a.stream;
    return { ..._ };
  }),
  on(actions.updateSuccess, (_, a) => {
    _[a.stream._id] = a.stream;
    return { ..._ };
  }),
);
