import { createAction, props } from '@ngrx/store';

import { StreamType } from '../enums';
import { IStream } from '../models';

export const addStream = createAction(
  '[STREAM] AddStream',
  props<{
    readonly streamType: StreamType;
    readonly name: string;
    readonly url?: string;
    readonly description?: string;
  }>(),
);

export const addStreamSuccess = createAction(
  '[STREAM] AddStreamSuccess',
  props<{ readonly stream: IStream }>(),
);

export const addStreamFailed = createAction(
  '[STREAM] AddStreamFailed',
  props<{ readonly error: Error }>(),
);
