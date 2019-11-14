import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IStreamState } from './stream.state';

export const selectState = createFeatureSelector<IStreamState>('stream');
export const selectStreams = createSelector(selectState, state => state.streams);
export const selectStreamMessages = createSelector(selectState, state => state.streamMessages);
export const selectStreamConnected = createSelector(selectState, state => state.streamConnected);
export const selectActiveStreamId = createSelector(selectState, state => state.activeStreamId);
export const selectActiveStream = createSelector(selectState, state => state.streams[state.activeStreamId]);

export const selectActiveStreamMessages = createSelector(selectState, state => {
  return (state.streamMessages[state.activeStreamId] || []).sort((one, two) => one.createdAt - two.createdAt);
});

export const selectEntities = createSelector(selectState, state => {
  return Object.values(state.streams).sort((one, two) => one.createdAt - two.createdAt);
});

export const selectActiveStreamConnected = createSelector(selectState, state => {
  return state.streamConnected[state.activeStreamId] || false;
});
