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
        name: a.stream.name ? a.stream.name.trim() : null,
        url: a.stream.url ? a.stream.url.trim() : null,
        description: a.stream.description ? a.stream.description.trim() : null,
        message: a.stream.message ? a.stream.message.trim() : null,
        event: a.stream.event ? a.stream.event.trim() : null,
        json: a.stream.json !== undefined ? a.stream.json : true,
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
