import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IUpdateState } from './update.state';

export const selectState = createFeatureSelector<IUpdateState>('update');
export const selectChecking = createSelector(selectState, state => state.checking);
export const selectAvailable = createSelector(selectState, state => state.available);
