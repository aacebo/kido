import { createAction, props } from '@ngrx/store';

export const removeAll = createAction(
  '[MESSAGE] RemoveAll',
  props<{ readonly streamId: string }>(),
);

export const removeAllSuccess = createAction(
  '[MESSAGE] RemoveAllSuccess',
  props<{ readonly streamId: string }>(),
);

export const removeAllFailed = createAction(
  '[MESSAGE] RemoveAllFailed',
  props<{ readonly error: Error }>(),
);
