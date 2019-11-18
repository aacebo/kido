import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import * as uuid from 'uuid';

import * as actions from '../../actions';
import { PouchService } from '../../../../core/services';
import { IStreamMessage } from '../../models';

@Injectable()
export class AddMessageEffects {
  private readonly _pouchService = new PouchService<IStreamMessage>('messages');

  readonly addMessage$ = createEffect(() => this._actions$.pipe(
    ofType(actions.addMessage),
    switchMap(a =>
      this._pouchService.put({
        _id: uuid(),
        streamId: a.streamId,
        type: a.messageType,
        content: a.content,
        event: a.event,
        json: a.json,
        size: Buffer.from(a.content).length,
        createdAt: new Date().getTime(),
      })
      .then(res => actions.addMessageSuccess({ message: res }))
      .catch(error => actions.addMessageFailed({ error })),
    ),
  ));

  constructor(private readonly _actions$: Actions) { }
}
