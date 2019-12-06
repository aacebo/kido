import { createReducer, on } from '@ngrx/store';

import { environment } from '../../../../../environments/environment';

import * as actions from '../../actions';
import { ILog } from '../../models';

export const logs = createReducer<ILog[]>(
  [ ],
  on(actions.addSuccess, (_, a) => {
    _.push(a.log);

    if (environment.maxLogs > _.length) {
      _.shift();
    }

    return [..._];
  }),
  on(actions.getSuccess, (_, a) => a.logs),
);
