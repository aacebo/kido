import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { switchMap, tap } from 'rxjs/operators';

import { PouchService } from '../../../../core/services';
import * as actions from '../../actions';
import { IStream } from '../../models';

@Injectable()
export class UpdateEffects {
  private readonly _pouchService = new PouchService<IStream>('streams');

  readonly update$ = createEffect(() => this._actions$.pipe(
    ofType(actions.update),
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
      .then(res => actions.updateSuccess({ stream: res }))
      .catch(error => actions.updateFailed({ error })),
    ),
  ));

  readonly updateFailed$ = createEffect(() => this._actions$.pipe(
    ofType(actions.updateFailed),
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
