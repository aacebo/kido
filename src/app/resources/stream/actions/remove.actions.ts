import { createAction, props } from '@ngrx/store';

export const remove = createAction(
  '[STREAM] Remove',
  props<{ readonly streamId: string; readonly _rev: string }>(),
);

export const removeSuccess = createAction(
  '[STREAM] RemoveSuccess',
  props<{ readonly streamId: string }>(),
);

export const removeFailed = createAction(
  '[STREAM] RemoveFailed',
  props<{ readonly error: Error }>(),
);
