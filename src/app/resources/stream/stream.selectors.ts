import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IStreamState } from './stream.state';

export const selectState = createFeatureSelector<IStreamState>('stream');
export const selectStreams = createSelector(selectState, state => state.streams);
export const selectConnected = createSelector(selectState, state => state.connected);
export const selectActiveId = createSelector(selectState, state => state.activeId);
export const selectActive = createSelector(selectState, state => state.streams[state.activeId]);

export const selectEntities = createSelector(selectState, state => {
  return Object.values(state.streams).sort((one, two) => one.createdAt - two.createdAt);
});

export const selectActiveConnected = createSelector(selectState, state => {
  return state.connected[state.activeId] || false;
});

export const selectActiveConnecting = createSelector(selectState, state => {
  return state.connecting[state.activeId] || false;
});
