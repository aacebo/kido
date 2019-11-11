import { createAction, props } from '@ngrx/store';

import { StreamType } from '../enums';

export const connectStream = createAction(
  '[STREAM] ConnectStream',
  props<{
    readonly streamType: StreamType;
    readonly url: string;
    readonly cb: (..._: any) => void;
  }>(),
);

export const disconnectStream = createAction(
  '[STREAM] DisconnectStream',
);

export const sendStream = createAction(
  '[STREAM] SendStream',
  props<{ readonly message: string }>(),
);
