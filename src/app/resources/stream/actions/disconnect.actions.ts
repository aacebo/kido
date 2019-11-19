import { createAction, props } from '@ngrx/store';

export const disconnect = createAction(
  '[STREAM] Disconnect',
  props<{ readonly streamId: string }>(),
);
