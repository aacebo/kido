import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IStreamState } from './stream.state';

export const selectState = createFeatureSelector<IStreamState>('stream');
export const selectStreams = createSelector(selectState, state => state.streams);
export const selectConnected = createSelector(selectState, state => state.connected);
export const selectLoading = createSelector(selectState, state => state.loading);
export const selectConnecting = createSelector(selectState, state => state.connecting);

export const selectEntities = createSelector(selectState, state => {
  return Object.values(state.streams).sort((one, two) => one.createdAt - two.createdAt);
});
