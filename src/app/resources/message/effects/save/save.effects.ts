import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { environment } from '../../../../../environments/environment';

import { PouchService } from '../../../../core/services';
import * as actions from '../../actions';
import { IMessage } from '../../models';
import { MessageService } from '../../services';

@Injectable()
export class SaveEffects {
  private readonly _pouchService = new PouchService<IMessage>('messages');

  readonly save$ = createEffect(() => this._actions$.pipe(
    ofType(actions.save),
    switchMap(a => this._messageService.messages$.pipe(
      take(1),
      map(v => ({
        streamId: a.streamId,
        messages: v[a.streamId] || [],
      })),
    )),
    switchMap(async (a) => {
      await this._pouchService.removeWhere({ streamId: a.streamId });
      await this._pouchService.bulk(a.messages);
      return this._pouchService.get(0, environment.maxMessages, environment.maxMessages, { streamId: a.streamId })
                               .then(res => actions.saveSuccess({ streamId: a.streamId, messages: res.docs }))
                               .catch(error => actions.saveFailed({ error }));
    }),
  ));

  readonly saveFailed$ = createEffect(() => this._actions$.pipe(
    ofType(actions.saveFailed),
    tap(err => this._toastr.error(
      `${err.error.message}`,
      'Error',
    )),
  ), { dispatch: false });

  constructor(
    private readonly _actions$: Actions,
    private readonly _toastr: ToastrService,
    private readonly _messageService: MessageService,
  ) { }
}
