import { createReducer, on } from '@ngrx/store';

import * as actions from '../../actions';
import { ILog } from '../../models';

export const logs = createReducer<{ [logId: number]: ILog }>(
  { },
  on(actions.addSuccess, (_, a) => ({
    ..._,
    [a.log._id]: a.log,
  })),
  on(actions.getSuccess, (_, a) => {
    const map: { [logId: string]: ILog } = { };

    for (const log of a.logs) {
      map[log._id] = log;
    }

    return map;
  }),
);
