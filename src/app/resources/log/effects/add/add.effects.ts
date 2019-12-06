import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { switchMap, tap } from 'rxjs/operators';
import * as uuid from 'uuid';

import { PouchService } from '../../../../core/services';
import * as actions from '../../actions';
import { ILog } from '../../models';

@Injectable()
export class AddEffects {
  private readonly _pouchService = new PouchService<ILog>('logs');

  readonly add$ = createEffect(() => this._actions$.pipe(
    ofType(actions.add),
    switchMap(a =>
      this._pouchService.put({
        _id: uuid(),
        type: a.logType,
        message: a.message,
        createdAt: new Date().getTime(),
      })
      .then(res => actions.addSuccess({ log: res }))
      .catch(error => actions.addFailed({ error })),
    ),
  ));

  readonly addFailed$ = createEffect(() => this._actions$.pipe(
    ofType(actions.addFailed),
    tap(a => this._toastr.error(
      `${a.error.message}`,
      'Add Failed',
    )),
  ), { dispatch: false });

  constructor(
    private readonly _actions$: Actions,
    private readonly _toastr: ToastrService,
  ) { }
}
