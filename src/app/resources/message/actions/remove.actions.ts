import { createAction, props } from '@ngrx/store';

export const remove = createAction(
  '[MESSAGE] Remove',
  props<{ readonly streamId: string, readonly _id: string }>(),
);
