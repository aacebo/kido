import { createAction, props } from '@ngrx/store';

import { IStream } from '../models';

export const get = createAction(
  '[STREAM] Get',
);

export const getSuccess = createAction(
  '[STREAM] GetSuccess',
  props<{ readonly streams: IStream[] }>(),
);

export const getFailed = createAction(
  '[STREAM] GetFailed',
  props<{ readonly error: Error }>(),
);

