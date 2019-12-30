import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { switchMap, tap } from 'rxjs/operators';

import { PouchService } from '../../../../core/services';
import * as actions from '../../actions';
import { IMessage } from '../../models';

@Injectable()
export class RemoveEffects {
  private readonly _pouchService = new PouchService<IMessage>('messages');

  readonly remove$ = createEffect(() => this._actions$.pipe(
    ofType(actions.remove),
    switchMap(a => this._pouchService.remove(a._id, a._rev)
        .then(() => actions.removeSuccess())
        .catch(error => actions.removeAllFailed({ error })),
    ),
  ));

  readonly removeFailed$ = createEffect(() => this._actions$.pipe(
    ofType(actions.removeAllFailed),
    tap(err => this._toastr.error(
      `${err.error.message}`,
      'Remove Failed',
    )),
  ), { dispatch: false });

  constructor(
    private readonly _actions$: Actions,
    private readonly _toastr: ToastrService,
  ) { }
}
