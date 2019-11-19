import { createAction, props } from '@ngrx/store';

import { StreamType } from '../enums';

export const connect = createAction(
  '[STREAM] Connect',
  props<{
    readonly streamId: string;
    readonly streamType: StreamType;
    readonly url: string;
  }>(),
);

export const connectSuccess = createAction(
  '[STREAM] ConnectSuccess',
  props<{ readonly streamId: string }>(),
);

export const connectFailed = createAction(
  '[STREAM] ConnectFailed',
  props<{ readonly streamId: string; readonly error: Error }>(),
);
