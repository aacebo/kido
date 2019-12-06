import { createAction, props } from '@ngrx/store';

import { ILog } from '../models';

export const get = createAction(
  '[LOG] Get',
);

export const getSuccess = createAction(
  '[LOG] GetSuccess',
  props<{ readonly logs: ILog[] }>(),
);

export const getFailed = createAction(
  '[LOG] GetFailed',
  props<{ readonly error: Error }>(),
);

