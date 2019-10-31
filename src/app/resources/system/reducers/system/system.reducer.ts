import { createReducer, on } from '@ngrx/store';

import * as actions from '../../system.actions';
import { ISystem } from '../../models';

export const system = createReducer<ISystem | undefined>(
  undefined,
  on(actions.add, (_, a) => a.system),
);
