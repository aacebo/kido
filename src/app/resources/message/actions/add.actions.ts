import { createAction, props } from '@ngrx/store';

import { MessageType } from '../enums';
import { IMessage } from '../models';

export const add = createAction(
  '[MESSAGE] Add',
  props<{
    readonly streamId: string;
    readonly messageType: MessageType;
    readonly content: any;
    readonly event?: string;
    readonly json?: boolean;
  }>(),
);

export const addSuccess = createAction(
  '[MESSAGE] AddSuccess',
  props<{ readonly message: IMessage }>(),
);

export const addFailed = createAction(
  '[MESSAGE] AddFailed',
  props<{ readonly error: Error }>(),
);
