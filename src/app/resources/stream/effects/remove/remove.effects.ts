import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { PouchService } from '../../../../core/services';
import { MessageService } from '../../../message';

import * as actions from '../../actions';
import { IStream } from '../../models';

@Injectable()
export class RemoveEffects {
  private readonly _pouchService = new PouchService<IStream>('streams');

  readonly remove$ = createEffect(() => this._actions$.pipe(
    ofType(actions.remove),
    switchMap(a =>
      this._pouchService.remove(a.streamId, a._rev)
        .then(() => actions.removeSuccess({ streamId: a.streamId }))
        .catch(error => actions.removeFailed({ error })),
    ),
  ));

  readonly removeSuccess$ = createEffect(() => this._actions$.pipe(
    ofType(actions.removeSuccess),
    tap(a => {
      this._messageService.removeAll(a.streamId);
    }),
  ), { dispatch: false });

  readonly removeFailed$ = createEffect(() => this._actions$.pipe(
    ofType(actions.addFailed),
    tap(a => this._toastr.error(
      `${a.error.message}`,
      'Add Failed',
    )),
  ), { dispatch: false });

  constructor(
    private readonly _actions$: Actions,
    private readonly _toastr: ToastrService,
    private readonly _messageService: MessageService,
  ) { }
}
