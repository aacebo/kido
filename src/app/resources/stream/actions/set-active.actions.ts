import { createAction, props } from '@ngrx/store';

export const setActive = createAction(
  '[STREAM] SetActive',
  props<{ readonly streamId: string }>(),
);
