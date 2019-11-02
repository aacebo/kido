import { createReducer, on } from '@ngrx/store';

import * as actions from '../../actions';
import { IStream } from '../../models';

export const collectionStreams = createReducer<{ [collectionId: string]: IStream[] }>(
  undefined,
  on(actions.getCollections, (_) => undefined),
  on(actions.getCollectionsFailed, (_) => undefined),
  on(actions.getCollectionsSuccess, (_) => ({ })),
  on(actions.getStreams, (_) => ({ })),
  on(actions.getStreamsFailed, (_) => ({ })),
  on(actions.getStreamsSuccess, (_, a) => {
    const map = { };

    for (const stream of a.streams) {
      if (map[stream.collectionId] === undefined) {
        map[stream.collectionId] = [stream];
      } else {
        map[stream.collectionId].push(stream);
      }
    }

    return map;
  }),
);
