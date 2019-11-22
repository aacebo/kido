import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, tap, map, take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import * as actions from '../../actions';
import { PouchService } from '../../../../core/services';
import { IMessage } from '../../models';
import { MessageService } from '../../services';

@Injectable()
export class RemoveAllEffects {
  private readonly _pouchService = new PouchService<IMessage>('messages');

  readonly removeAll$ = createEffect(() => this._actions$.pipe(
    ofType(actions.removeAll),
    switchMap(a => this._messageService.messages$.pipe(
      take(1),
      map(v => ({
        streamId: a.streamId,
        messages: v[a.streamId] || [],
      })),
    )),
    switchMap(a => {
      for (const message of a.messages) {
        this._pouchService.remove(message._id, message._rev);
      }

      return this._pouchService.bulk(
        a.messages.map(v => ({
          ...v,
          _deleted: true,
        })),
      ).then(() => actions.removeAllSuccess({ streamId: a.streamId }))
       .catch(error => actions.removeAllFailed({ error }));
    }),
  ));

  readonly removeAllFailed$ = createEffect(() => this._actions$.pipe(
    ofType(actions.removeFailed),
    tap(err => this._toastr.error(
      `${err.error.message}`,
      'Remove All Failed',
    )),
  ), { dispatch: false });

  constructor(
    private readonly _actions$: Actions,
    private readonly _toastr: ToastrService,
    private readonly _messageService: MessageService,
  ) { }
}
