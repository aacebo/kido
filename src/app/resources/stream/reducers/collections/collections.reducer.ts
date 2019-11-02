import { createReducer, on } from '@ngrx/store';

import * as actions from '../../actions';
import { IStreamCollection } from '../../models';

export const collections = createReducer<IStreamCollection[]>(
  [],
  on(actions.getCollections, (_) => []),
  on(actions.getCollectionsFailed, (_) => []),
  on(actions.getCollectionsSuccess, (_, a) => a.collections),
);
