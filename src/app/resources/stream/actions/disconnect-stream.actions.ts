import { createAction, props } from '@ngrx/store';

export const disconnectStream = createAction(
  '[STREAM] DisconnectStream',
  props<{ readonly streamId: string }>(),
);
