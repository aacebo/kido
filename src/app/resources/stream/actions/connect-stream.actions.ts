import { createAction, props } from '@ngrx/store';

import { StreamType } from '../enums';

export const connectStream = createAction(
  '[STREAM] ConnectStream',
  props<{
    readonly streamId: string;
    readonly streamType: StreamType;
    readonly url: string;
  }>(),
);

export const connectStreamSuccess = createAction(
  '[STREAM] ConnectStreamSuccess',
  props<{ readonly streamId: string }>(),
);

export const connectStreamFailed = createAction(
  '[STREAM] ConnectStreamFailed',
  props<{ readonly error: Error }>(),
);
