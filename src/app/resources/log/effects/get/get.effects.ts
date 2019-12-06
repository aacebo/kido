import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { switchMap, tap } from 'rxjs/operators';

import { environment } from '../../../../../environments/environment';

import { PouchService } from '../../../../core/services';
import * as actions from '../../actions';
import { ILog } from '../../models';

@Injectable()
export class GetEffects {
  private readonly _pouchService = new PouchService<ILog>('logs');

  readonly get$ = createEffect(() => this._actions$.pipe(
    ofType(actions.get),
    switchMap(() =>
      this._pouchService.get(0, environment.maxLogs, environment.maxLogs)
        .then(res => actions.getSuccess({ logs: res.docs }))
        .catch(error => actions.getFailed({ error })),
    ),
  ));

  readonly getFailed$ = createEffect(() => this._actions$.pipe(
    ofType(actions.getFailed),
    tap(err => this._toastr.error(
      `${err.error.message}`,
      'Error',
    )),
  ), { dispatch: false });

  constructor(
    private readonly _actions$: Actions,
    private readonly _toastr: ToastrService,
  ) { }
}
