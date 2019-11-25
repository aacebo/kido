import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as actions from '../../actions';
import * as selectors from '../../message.selectors';
import { IMessageState } from '../../message.state';
import { IMessage } from '../../models';
import { MessageType } from '../../enums';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  readonly state$: Observable<IMessageState>;
  readonly messages$: Observable<{ [streamId: string]: IMessage[] }>;

  constructor(private readonly _store$: Store<IMessageState>) {
    this.state$ = this._store$.pipe(select(selectors.selectState));
    this.messages$ = this._store$.pipe(select(selectors.selectMessages));
  }

  get(streamId: string) {
    this._store$.dispatch(actions.get({ streamId }));
  }

  add(streamId: string, messageType: MessageType, content: any, event?: string, json?: boolean) {
    this._store$.dispatch(actions.add({ streamId, messageType, content, event, json }));
  }

  remove(streamId: string, _id: string) {
    this._store$.dispatch(actions.remove({ streamId, _id }));
  }

  removeAll(streamId: string) {
    this._store$.dispatch(actions.removeAll({ streamId }));
  }

  send(streamId: string, message: string, event?: string, json?: boolean) {
    this._store$.dispatch(actions.send({ streamId, message, event, json }));
  }

  save(streamId: string) {
    this._store$.dispatch(actions.save({ streamId }));
  }
}
