import { createAction, props } from '@ngrx/store';

export const checking = createAction(
  '[UPDATE] Checking',
);

export const available = createAction(
  '[UPDATE] Available',
  props<{ readonly available: boolean }>(),
);
