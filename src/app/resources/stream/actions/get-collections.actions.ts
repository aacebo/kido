import { createAction, props } from '@ngrx/store';

import { IStreamCollection } from '../models';

export const getCollections = createAction(
  '[STREAM] GetCollections',
);

export const getCollectionsSuccess = createAction(
  '[STREAM] GetCollectionsSuccess',
  props<{ readonly collections: IStreamCollection[] }>(),
);

export const getCollectionsFailed = createAction(
  '[STREAM] GetCollectionsFailed',
  props<{ readonly error: Error }>(),
);

