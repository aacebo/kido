import { createAction, props } from '@ngrx/store';

import { ISystem } from './models';

export const add = createAction(
  '[SYSTEM] Set',
  props<{ readonly system: ISystem }>(),
);
