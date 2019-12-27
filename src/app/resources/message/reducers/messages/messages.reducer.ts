import { createReducer, on } from '@ngrx/store';
import * as uuid from 'uuid';

import { environment } from '../../../../../environments/environment';

import * as actions from '../../actions';
import { IMessage } from '../../models';

export const messages = createReducer<{ [streamId: string]: IMessage[] }>(
  { },
  on(actions.getSuccess, (_, a) => {
    const state = { ..._ };
    state[a.streamId] = a.messages.slice().sort((one, two) => one.createdAt - two.createdAt);
    return state;
  }),
  on(actions.saveSuccess, (_, a) => {
    const state = { ..._ };
    state[a.streamId] = a.messages.slice().sort((one, two) => one.createdAt - two.createdAt);
    return state;
  }),
  on(actions.add, (_, a) => {
    const state = { ..._ };
    const msgs = state[a.streamId] ? [...state[a.streamId]] : [];

    msgs.push({
      _id: uuid(),
      streamId: a.streamId,
      type: a.messageType,
      content: a.content,
      event: a.event,
      json: a.json,
      size: Buffer.from(a.content).length,
      createdAt: new Date().getTime(),
    });

    if (msgs.length > environment.maxMessages) {
      msgs.shift();
    }

    state[a.streamId] = [...msgs];
    return state;
  }),
  on(actions.remove, (_, a) => {
    const state = { ..._ };
    const msgs = state[a.streamId] ? [...state[a.streamId]] : [];

    for (let i = 0; i < msgs.length; i++) {
      if (msgs[i]._id === a._id) {
        msgs.splice(i, 1);
        break;
      }
    }

    state[a.streamId] = [...msgs];
    return state;
  }),
  on(actions.removeAllSuccess, (_, a) => {
    const state = { ..._ };
    state[a.streamId] = undefined;
    return state;
  }),
);
