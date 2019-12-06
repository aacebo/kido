import { createAction, props } from '@ngrx/store';

import { LogType } from '../enums';
import { ILog } from '../models';

export const add = createAction(
  '[LOG] Add',
  props<{ readonly logType: LogType; readonly message: any }>(),
);

export const addSuccess = createAction(
  '[LOG] AddSuccess',
  props<{ readonly log: ILog }>(),
);

export const addFailed = createAction(
  '[LOG] AddFailed',
  props<{ readonly error: Error }>(),
);

