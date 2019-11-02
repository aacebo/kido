import { createAction, props } from '@ngrx/store';

import { IStreamMessage } from '../models';

export const getMessages = createAction(
  '[STREAM] GetMessages',
);

export const getMessagesSuccess = createAction(
  '[STREAM] GetMessagesSuccess',
  props<{ readonly messages: IStreamMessage[] }>(),
);

export const getMessagesFailed = createAction(
  '[STREAM] GetMessagesFailed',
  props<{ readonly error: Error }>(),
);

