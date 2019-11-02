import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as actions from '../../actions';
import * as selectors from '../../stream.selectors';
import { IStreamState } from '../../stream.state';
import { IStreamCollection, IStream, IStreamMessage } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class StreamService {
  readonly state$: Observable<IStreamState>;
  readonly collections$: Observable<IStreamCollection[]>;
  readonly collectionStreams$: Observable<{ [collectionId: string]: IStream[] }>;
  readonly streamMessages$: Observable<{ [streamId: string]: IStreamMessage[] }>;

  constructor(private readonly _store$: Store<IStreamState>) {
    this.state$ = this._store$.pipe(select(selectors.selectState));
    this.collections$ = this._store$.pipe(select(selectors.selectCollections));
    this.collectionStreams$ = this._store$.pipe(select(selectors.selectCollectionStreams));
    this.streamMessages$ = this._store$.pipe(select(selectors.selectStreamMessages));
  }

  getCollections() {
    this._store$.dispatch(actions.getCollections());
  }

  getStreams() {
    this._store$.dispatch(actions.getStreams());
  }

  getMessages() {
    this._store$.dispatch(actions.getMessages());
  }
}
