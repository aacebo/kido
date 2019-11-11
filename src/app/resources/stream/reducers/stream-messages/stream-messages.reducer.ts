import { createReducer, on } from '@ngrx/store';

import * as actions from '../../actions';
import { IStreamMessage } from '../../models';

export const streamMessages = createReducer<{ [streamId: string]: IStreamMessage[] }>(
  undefined,
  on(actions.getStreams, (_) => undefined),
  on(actions.getStreamsFailed, (_) => undefined),
  on(actions.getStreamsSuccess, (_) => ({ })),
  on(actions.getMessages, (_) => ({ })),
  on(actions.getMessagesFailed, (_) => ({ })),
  on(actions.getMessagesSuccess, (_, a) => {
    const map = { };

    for (const msg of a.messages) {
      if (map[msg.streamId] === undefined) {
        map[msg.streamId] = [msg];
      } else {
        map[msg.streamId].push(msg);
      }
    }

    return map;
  }),
  on(actions.addMessageSuccess, (_, a) => {
    const messages = _[a.message.streamId] || [];

    messages.push(a.message);
    _[a.message.streamId] = messages;

    return {
      ..._,
    };
  }),
);
