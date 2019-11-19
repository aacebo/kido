import { createAction, props } from '@ngrx/store';

export const send = createAction(
  '[MESSAGE] Send',
  props<{
    readonly streamId: string;
    readonly message: string;
    readonly event?: string;
    readonly json?: boolean;
  }>(),
);
