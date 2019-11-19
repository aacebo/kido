import { createAction, props } from '@ngrx/store';

import { IStream } from '../models';

export const update = createAction(
  '[STREAM] Update',
  props<{ readonly stream: Partial<IStream> }>(),
);

export const updateSuccess = createAction(
  '[STREAM] UpdateSuccess',
  props<{ readonly stream: IStream }>(),
);

export const updateFailed = createAction(
  '[STREAM] UpdateFailed',
  props<{ readonly error: Error }>(),
);
