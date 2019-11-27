import { createReducer, on } from '@ngrx/store';

import { ISystem } from '../../models';
import * as actions from '../../system.actions';

export const system = createReducer<ISystem | undefined>(
  undefined,
  on(actions.add, (_, a) => a.system),
);
