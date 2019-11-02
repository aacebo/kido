import { createAction, props } from '@ngrx/store';

import { IStream } from '../models';

export const getStreams = createAction(
  '[STREAM] GetStreams',
);

export const getStreamsSuccess = createAction(
  '[STREAM] GetStreamsSuccess',
  props<{ readonly streams: IStream[] }>(),
);

export const getStreamsFailed = createAction(
  '[STREAM] GetStreamsFailed',
  props<{ readonly error: Error }>(),
);

