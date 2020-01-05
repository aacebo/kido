import { createAction, props } from '@ngrx/store';

import { IStreamArg } from '../../stream';

export const send = createAction(
  '[MESSAGE] Send',
  props<{
    readonly streamId: string;
    readonly args: IStreamArg[];
    readonly event?: string;
  }>(),
);
