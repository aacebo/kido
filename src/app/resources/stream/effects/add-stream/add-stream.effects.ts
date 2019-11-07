import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import * as uuid from 'uuid';

import * as actions from '../../actions';
import { PouchService } from '../../../../core/services';
import { IStream } from '../../models';

@Injectable()
export class AddStreamEffects {
  private readonly _pouchService = new PouchService<IStream>('streams');

  readonly addStream$ = createEffect(() => this._actions$.pipe(
    ofType(actions.addStream),
    switchMap(a =>
      this._pouchService.put({
        _id: uuid(),
        type: a.streamType,
        name: a.name,
        url: a.url,
        description: a.description,
        createdAt: new Date().getTime(),
      })
      .then(res => actions.addStreamSuccess({ stream: res }))
      .catch(error => actions.addStreamFailed({ error })),
    ),
  ));

  constructor(private readonly _actions$: Actions) { }
}
