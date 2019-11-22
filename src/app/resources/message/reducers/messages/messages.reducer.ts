import { createReducer, on } from '@ngrx/store';

import * as actions from '../../actions';
import { IMessage } from '../../models';

export const messages = createReducer<{ [streamId: string]: IMessage[] }>(
  { },
  on(actions.getSuccess, (_, a) => {
    _[a.streamId] = [...a.messages.sort((one, two) => one.createdAt - two.createdAt)];
    return { ..._ };
  }),
  on(actions.addComplete, (_, a) => {
    _[a.streamId] = [...a.messages];
    return { ..._ };
  }),
  on(actions.remove, (_, a) => {
    const msgs = _[a.streamId] || [];

    for (let i = 0; i < msgs.length; i++) {
      if (msgs[i]._id === a._id) {
        msgs.splice(i, 1);
        break;
      }
    }

    _[a.streamId] = [...msgs];
    return { ..._ };
  }),
  on(actions.removeAllSuccess, (_, a) => {
    _[a.streamId] = undefined;
    return { ..._ };
  }),
);
