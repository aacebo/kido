import { createAction, props } from '@ngrx/store';

export const setOnline = createAction(
  '[SYSTEM] SetOnline',
  props<{ readonly online: boolean }>(),
);
