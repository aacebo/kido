import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IStreamState } from './stream.state';

export const selectState = createFeatureSelector<IStreamState>('stream');
export const selectCollections = createSelector(selectState, state => state.collections);
export const selectCollectionStreams = createSelector(selectState, state => state.collectionStreams);
export const selectStreamMessages = createSelector(selectState, state => state.streamMessages);
