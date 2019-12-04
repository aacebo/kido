import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ILogState } from './log.state';

export const selectState = createFeatureSelector<ILogState>('log');
export const selectLogs = createSelector(selectState, state => state.logs);
