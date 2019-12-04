import { createReducer, on } from '@ngrx/store';

import * as actions from '../../log.actions';
import { ILog } from '../../models';

export const logs = createReducer<{ [createdAt: number]: ILog }>(
  { },
  on(actions.create, (_, a) => {
    const log: ILog = {
      type: a.logType,
      message: a.message,
      createdAt: new Date().getTime(),
    };

    return {
      ..._,
      [log.createdAt]: log,
    };
  }),
);
