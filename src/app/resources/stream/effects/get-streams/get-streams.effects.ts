import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';

import * as actions from '../../actions';
import { PouchService } from '../../../../core/services';
import { IStream } from '../../models';

@Injectable()
export class GetStreamsEffects {
  private readonly _pouchService = new PouchService<IStream>('streams');

  readonly streams$ = createEffect(() => this._actions$.pipe(
    ofType(actions.getStreams),
    switchMap(() =>
      this._pouchService.get()
        .then(res => actions.getStreamsSuccess({ streams: res.docs }))
        .catch(error => actions.getStreamsFailed({ error })),
    ),
  ));

  constructor(private readonly _actions$: Actions) { }
}
