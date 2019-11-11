import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import * as actions from '../../actions';
import { PouchService } from '../../../../core/services';
import { IStream } from '../../models';

@Injectable()
export class UpdateStreamEffects {
  private readonly _pouchService = new PouchService<IStream>('streams');

  readonly updateStream$ = createEffect(() => this._actions$.pipe(
    ofType(actions.updateStream),
    switchMap(a =>
      this._pouchService.put({
        _id: a.stream._id,
        _rev: a.stream._rev,
        type: a.stream.type,
        name: a.stream.name,
        url: a.stream.url,
        description: a.stream.description,
        message: a.stream.message,
        createdAt: a.stream.createdAt,
      })
      .then(res => actions.updateStreamSuccess({ stream: res }))
      .catch(error => actions.updateStreamFailed({ error })),
    ),
  ));

  readonly updateStreamSuccess$ = createEffect(() => this._actions$.pipe(
    ofType(actions.updateStreamSuccess),
    tap(a => this._toastr.success(
      `Stream ${a.stream.name} updated`,
      'Update Success',
    )),
  ), { dispatch: false });

  readonly updateStreamFailed$ = createEffect(() => this._actions$.pipe(
    ofType(actions.updateStreamFailed),
    tap(a => this._toastr.error(
      `${a.error.message}`,
      'Update Failed',
    )),
  ), { dispatch: false });

  constructor(
    private readonly _actions$: Actions,
    private readonly _toastr: ToastrService,
  ) { }
}
