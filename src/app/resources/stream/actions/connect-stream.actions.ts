import { createAction, props } from '@ngrx/store';

import { StreamType } from '../enums';

export const connectStream = createAction(
  '[STREAM] ConnectStream',
  props<{
    readonly streamId: string;
    readonly streamType: StreamType;
    readonly url: string;
    readonly cb: (..._: any) => void;
  }>(),
);

export const disconnectStream = createAction(
  '[STREAM] DisconnectStream',
  props<{ readonly streamId: string }>(),
);

export const sendStream = createAction(
  '[STREAM] SendStream',
  props<{ readonly streamId: string, readonly message: string }>(),
);
