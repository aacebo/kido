import { createAction, props } from '@ngrx/store';

import { IMessage } from '../models';

export const save = createAction(
  '[MESSAGE] Save',
  props<{ readonly streamId: string }>(),
);

export const saveSuccess = createAction(
  '[MESSAGE] SaveSuccess',
  props<{ readonly streamId: string; readonly messages: IMessage[] }>(),
);

export const saveFailed = createAction(
  '[MESSAGE] SaveFailed',
  props<{ readonly error: Error }>(),
);
