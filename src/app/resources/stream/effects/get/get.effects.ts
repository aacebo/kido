import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, tap } from 'rxjs/operators';

import { environment } from '../../../../../environments/environment';

import * as actions from '../../actions';
import { PouchService } from '../../../../core/services';
import { MessageService } from '../../../message';
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

  readonly getSuccess$ = createEffect(() => this._actions$.pipe(
    ofType(actions.getSuccess),
    tap(a => {
      let active = localStorage.getItem(environment.activeStreamKey);

      if (!active || active === 'null') {
        active = (a.streams.length > 0 ? a.streams[0]._id : undefined);
      }

      this._messageService.get(active);
    }),
  ), { dispatch: false });

  constructor(
    private readonly _actions$: Actions,
    private readonly _messageService: MessageService,
  ) { }
}
