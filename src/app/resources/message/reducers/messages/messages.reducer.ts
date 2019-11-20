import { createReducer, on } from '@ngrx/store';

import * as actions from '../../actions';
import { IMessage } from '../../models';

export const messages = createReducer<{ [streamId: string]: IMessage[] }>(
  undefined,
  on(actions.get, (_) => ({ })),
  on(actions.getFailed, (_) => ({ })),
  on(actions.getSuccess, (_, a) => {
    const map: { [streamId: string]: IMessage[] } = { };

    for (const msg of a.messages) {
      if (map[msg.streamId] === undefined) {
        map[msg.streamId] = [msg];
      } else {
        map[msg.streamId].push(msg);
      }
    }

    return map;
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
);
