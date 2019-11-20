import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, tap, map, take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import * as uuid from 'uuid';

import { environment } from '../../../../../environments/environment';

import * as actions from '../../actions';
import { PouchService } from '../../../../core/services';
import { IMessage } from '../../models';
import { MessageService } from '../../services';

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

  readonly addSuccess$ = createEffect(() => this._actions$.pipe(
    ofType(actions.addSuccess),
    switchMap(a => this._messageService.messages$.pipe(
      take(1),
      map(v => v[a.message.streamId]),
    )),
    tap(messages => {
      if (messages.length + 1 > environment.maxMessages) {
        const msg = messages[0];
        this._messageService.remove(msg.streamId, msg._id, msg._rev);
      }
    }),
  ), { dispatch: false });

  readonly addFailed$ = createEffect(() => this._actions$.pipe(
    ofType(actions.addFailed),
    tap(err => this._toastr.error(
      `${err.error.message}`,
      'Add Failed',
    )),
  ), { dispatch: false });

  constructor(
    private readonly _actions$: Actions,
    private readonly _toastr: ToastrService,
    private readonly _messageService: MessageService,
  ) { }
}
