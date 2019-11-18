import { createAction, props } from '@ngrx/store';

import { StreamMessageType } from '../enums';
import { IStreamMessage } from '../models';

export const addMessage = createAction(
  '[STREAM] AddMessage',
  props<{
    readonly streamId: string;
    readonly messageType: StreamMessageType;
    readonly content: any;
    readonly event?: string;
    readonly json?: boolean;
  }>(),
);

export const addMessageSuccess = createAction(
  '[STREAM] AddMessageSuccess',
  props<{ readonly message: IStreamMessage }>(),
);

export const addMessageFailed = createAction(
  '[STREAM] AddMessageFailed',
  props<{ readonly error: Error }>(),
);
