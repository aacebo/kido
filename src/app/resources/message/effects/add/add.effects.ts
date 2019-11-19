import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import * as uuid from 'uuid';

import * as actions from '../../actions';
import { PouchService } from '../../../../core/services';
import { IMessage } from '../../models';

@Injectable()
export class AddEffects {
  private readonly _pouchService = new PouchService<IMessage>('messages');

  readonly add$ = createEffect(() => this._actions$.pipe(
    ofType(actions.add),
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
      .then(res => actions.addSuccess({ message: res }))
      .catch(error => actions.addFailed({ error })),
    ),
  ));

  constructor(private readonly _actions$: Actions) { }
}
