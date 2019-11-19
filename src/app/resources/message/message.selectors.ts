import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IMessageState } from './message.state';

export const selectState = createFeatureSelector<IMessageState>('message');
export const selectMessages = createSelector(selectState, state => state.messages);
