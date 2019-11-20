import { createAction, props } from '@ngrx/store';

export const remove = createAction(
  '[MESSAGE] Remove',
  props<{ readonly streamId: string, readonly _id: string, _rev: string }>(),
);

export const removeSuccess = createAction(
  '[MESSAGE] RemoveSuccess',
);

export const removeFailed = createAction(
  '[MESSAGE] RemoveFailed',
  props<{ readonly error: Error }>(),
);
