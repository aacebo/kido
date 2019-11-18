import { createReducer, on } from '@ngrx/store';

import { environment } from '../../../../../environments/environment';

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
    const map: { [streamId: string]: IStreamMessage[] } = { };
    const messages = a.messages.sort((one, two) => one.createdAt - two.createdAt)
                               .slice(a.messages.length - environment.maxMessages, a.messages.length);

    for (const msg of messages) {
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

    if (messages.length > environment.maxMessages) {
      messages.shift();
    }

    _[a.message.streamId] = [...messages];

    return { ..._ };
  }),
);
