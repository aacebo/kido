import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { switchMap, tap } from 'rxjs/operators';

import { PouchService } from '../../../../core/services';
import * as actions from '../../actions';
import { IMessage } from '../../models';

@Injectable()
export class RemoveAllEffects {
  private readonly _pouchService = new PouchService<IMessage>('messages');

  readonly removeAll$ = createEffect(() => this._actions$.pipe(
    ofType(actions.removeAll),
    switchMap(a => this._pouchService.removeWhere({ streamId: a.streamId })
        .then(() => actions.removeAllSuccess({ streamId: a.streamId }))
        .catch(error => actions.removeAllFailed({ error })),
    ),
  ));

  readonly removeAllFailed$ = createEffect(() => this._actions$.pipe(
    ofType(actions.removeAllFailed),
    tap(err => this._toastr.error(
      `${err.error.message}`,
      'Remove All Failed',
    )),
  ), { dispatch: false });

  constructor(
    private readonly _actions$: Actions,
    private readonly _toastr: ToastrService,
  ) { }
}
