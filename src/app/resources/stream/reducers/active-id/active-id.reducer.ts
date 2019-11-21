import { createReducer, on } from '@ngrx/store';

import { environment } from '../../../../../environments/environment';
import * as actions from '../../actions';

export const activeId = createReducer<string | undefined>(
  undefined,
  on(actions.setActive, (_, a) => {
    localStorage.setItem(environment.activeStreamKey, a.streamId);
    return a.streamId;
  }),
  on(actions.addSuccess, (_, a) => {
    localStorage.setItem(environment.activeStreamKey, a.stream._id);
    return a.stream._id;
  }),
  on(actions.getSuccess, (_, a) => {
    let active = localStorage.getItem(environment.activeStreamKey);

    if (!active || active === 'null') {
      active = (a.streams.length > 0 ? a.streams[0]._id : undefined);

      if (active) {
        localStorage.setItem(environment.activeStreamKey, active);
      }
    }

    return active;
  }),
);
