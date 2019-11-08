import { createAction, props } from '@ngrx/store';

import { IStream } from '../models';

export const updateStream = createAction(
  '[STREAM] UpdateStream',
  props<{ readonly stream: Partial<IStream> }>(),
);

export const updateStreamSuccess = createAction(
  '[STREAM] UpdateStreamSuccess',
  props<{ readonly stream: IStream }>(),
);

export const updateStreamFailed = createAction(
  '[STREAM] UpdateStreamFailed',
  props<{ readonly error: Error }>(),
);
