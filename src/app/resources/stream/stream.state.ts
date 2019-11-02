import { combineReducers, Action } from '@ngrx/store';

import { IStream, IStreamCollection, IStreamMessage } from './models';
import * as fromReducers from './reducers';

export interface IStreamState {
  readonly collections: IStreamCollection[];
  readonly collectionStreams: { [collectionId: string]: IStream[] };
  readonly streamMessages: { [streamId: string]: IStreamMessage[] };
}

export function reducers(state: IStreamState, action: Action) {
  return combineReducers<IStreamState>({
    collections: fromReducers.collections,
    collectionStreams: fromReducers.collectionStreams,
    streamMessages: fromReducers.streamMessages,
  })(state, action);
}
