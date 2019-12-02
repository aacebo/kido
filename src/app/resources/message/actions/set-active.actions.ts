import { createAction, props } from '@ngrx/store';

export const setActive = createAction(
  '[MESSAGE] SetActive',
  props<{ readonly messageId?: string }>(),
);
