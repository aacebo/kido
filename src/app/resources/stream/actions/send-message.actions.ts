import { createAction, props } from '@ngrx/store';

export const sendMessage = createAction(
  '[STREAM] SendMessage',
  props<{
    readonly streamId: string;
    readonly message: string;
    readonly event?: string;
    readonly json?: boolean;
  }>(),
);
