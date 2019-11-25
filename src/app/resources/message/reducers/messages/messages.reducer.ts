import { createReducer, on } from '@ngrx/store';
import * as uuid from 'uuid';

import { environment } from '../../../../../environments/environment';

import * as actions from '../../actions';
import { IMessage } from '../../models';

export const messages = createReducer<{ [streamId: string]: IMessage[] }>(
  { },
  on(actions.getSuccess, (_, a) => {
    _[a.streamId] = [...a.messages.sort((one, two) => one.createdAt - two.createdAt)];
    return { ..._ };
  }),
  on(actions.saveSuccess, (_, a) => {
    _[a.streamId] = [...a.messages.sort((one, two) => one.createdAt - two.createdAt)];
    return { ..._ };
  }),
  on(actions.add, (_, a) => {
    const msgs = _[a.streamId] || [];

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

    _[a.streamId] = [...msgs];
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
