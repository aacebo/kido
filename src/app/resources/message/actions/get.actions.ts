import { createAction, props } from '@ngrx/store';

import { IMessage } from '../models';

export const get = createAction(
  '[MESSAGE] Get',
);

export const getSuccess = createAction(
  '[MESSAGE] GetSuccess',
  props<{ readonly messages: IMessage[] }>(),
);

export const getFailed = createAction(
  '[MESSAGE] GetFailed',
  props<{ readonly error: Error }>(),
);
