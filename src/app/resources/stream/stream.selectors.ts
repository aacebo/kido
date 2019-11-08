import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IStreamState } from './stream.state';

export const selectState = createFeatureSelector<IStreamState>('stream');
export const selectStreams = createSelector(selectState, state => state.streams);
export const selectStreamMessages = createSelector(selectState, state => state.streamMessages);
export const selectActive = createSelector(selectState, state => state.active);
export const selectActiveStream = createSelector(selectState, state => state.streams.find(s => s._id === state.active));
