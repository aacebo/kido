import { createAction, props } from '@ngrx/store';

import { LogType } from './enums';

export const create = createAction(
  '[LOG] Create',
  props<{ readonly logType: LogType; readonly message: any }>(),
);
