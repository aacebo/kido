import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { switchMap, tap } from 'rxjs/operators';
import * as uuid from 'uuid';

import { PouchService } from '../../../../core/services';
import * as actions from '../../actions';
import { IStream } from '../../models';

@Injectable()
export class AddEffects {
  private readonly _pouchService = new PouchService<IStream>('streams');

  readonly add$ = createEffect(() => this._actions$.pipe(
    ofType(actions.add),
    switchMap(a =>
      this._pouchService.put({
        _id: uuid(),
        type: a.streamType,
        name: a.name ? a.name.trim() : null,
        url: a.url ? a.url.trim() : null,
        description: a.description ? a.description.trim() : null,
        event: null,
        args: [{ value: '', json: false }],
        listeners: [],
        createdAt: new Date().getTime(),
      })
      .then(res => actions.addSuccess({ stream: res }))
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
