import { createAction, props } from '@ngrx/store';

import { MessageType } from '../enums';

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
