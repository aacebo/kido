import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';

import * as actions from '../../actions';
import { PouchService } from '../../../../core/services';
import { IStream } from '../../models';

@Injectable()
export class GetEffects {
  private readonly _pouchService = new PouchService<IStream>('streams');

  readonly get$ = createEffect(() => this._actions$.pipe(
    ofType(actions.get),
    switchMap(() =>
      this._pouchService.get()
        .then(res => actions.getSuccess({ streams: res.docs }))
        .catch(error => actions.getFailed({ error })),
    ),
  ));

  constructor(private readonly _actions$: Actions) { }
}
