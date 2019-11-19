import { createAction, props } from '@ngrx/store';

import { StreamType } from '../enums';
import { IStream } from '../models';

export const add = createAction(
  '[STREAM] Add',
  props<{
    readonly streamType: StreamType;
    readonly name: string;
    readonly url?: string;
    readonly description?: string;
  }>(),
);

export const addSuccess = createAction(
  '[STREAM] AddSuccess',
  props<{ readonly stream: IStream }>(),
);

export const addFailed = createAction(
  '[STREAM] AddFailed',
  props<{ readonly error: Error }>(),
);
