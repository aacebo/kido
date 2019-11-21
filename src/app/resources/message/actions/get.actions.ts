import { createAction, props } from '@ngrx/store';

import { IMessage } from '../models';

export const get = createAction(
  '[MESSAGE] Get',
  props<{ readonly streamId: string }>(),
);

export const getSuccess = createAction(
  '[MESSAGE] GetSuccess',
  props<{ readonly streamId: string; readonly messages: IMessage[] }>(),
);

export const getFailed = createAction(
  '[MESSAGE] GetFailed',
  props<{ readonly error: Error }>(),
);
