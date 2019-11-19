import { createReducer, on } from '@ngrx/store';

import { environment } from '../../../../../environments/environment';

import * as actions from '../../actions';
import { IMessage } from '../../models';

export const messages = createReducer<{ [streamId: string]: IMessage[] }>(
  undefined,
  on(actions.get, (_) => ({ })),
  on(actions.getFailed, (_) => ({ })),
  on(actions.getSuccess, (_, a) => {
    const map: { [streamId: string]: IMessage[] } = { };
    const msgs = a.messages.sort((one: any, two: any) => one.createdAt - two.createdAt)
                           .slice(a.messages.length - environment.maxMessages, a.messages.length);

    for (const msg of msgs) {
      if (map[msg.streamId] === undefined) {
        map[msg.streamId] = [msg];
      } else {
        map[msg.streamId].push(msg);
      }
    }

    return map;
  }),
  on(actions.addSuccess, (_, a) => {
    const msgs = _[a.message.streamId] || [];

    msgs.push(a.message);

    if (messages.length > environment.maxMessages) {
      msgs.shift();
    }

    _[a.message.streamId] = [...msgs];

    return { ..._ };
  }),
);
