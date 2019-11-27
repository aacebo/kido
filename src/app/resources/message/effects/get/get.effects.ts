import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { switchMap, tap } from 'rxjs/operators';

import { environment } from '../../../../../environments/environment';

import { PouchService } from '../../../../core/services';
import * as actions from '../../actions';
import { IMessage } from '../../models';

@Injectable()
export class GetEffects {
  private readonly _pouchService = new PouchService<IMessage>('messages');

  readonly get$ = createEffect(() => this._actions$.pipe(
    ofType(actions.get),
    switchMap(a =>
      this._pouchService.get(0, environment.maxMessages, environment.maxMessages, { streamId: a.streamId })
        .then(res => actions.getSuccess({ streamId: a.streamId, messages: res.docs }))
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
