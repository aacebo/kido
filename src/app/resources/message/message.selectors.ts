import { createFeatureSelector, createSelector } from '@ngrx/store';

import { selectActiveId as selectActiveStreamId } from '../stream/stream.selectors';
import { IMessageState } from './message.state';

export const selectState = createFeatureSelector<IMessageState>('message');
export const selectMessages = createSelector(selectState, state => state.messages);
export const selectActiveId = createSelector(selectState, state => state.activeId);

export const selectActive = createSelector(
  selectState,
  selectActiveStreamId,
  (state, activeStreamId) => {
    const messages = state.messages[activeStreamId] || [];
    return messages.find(v => v._id === state.activeId);
  },
);

export const selectActiveContent = createSelector(
  selectActive,
  active =>
    active ? {
      root: active.json ? JSON.parse(active.content) : active.content,
    } : undefined,
);
