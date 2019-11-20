import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';

import { environment } from '../../../../../environments/environment';

import * as actions from '../../actions';
import { PouchService } from '../../../../core/services';
import { IMessage } from '../../models';

@Injectable()
export class GetEffects {
  private readonly _pouchService = new PouchService<IMessage>('messages');

  readonly get$ = createEffect(() => this._actions$.pipe(
    ofType(actions.get),
    switchMap(() =>
      this._pouchService.get(1, environment.maxMessages, environment.maxMessages)
        .then(res => actions.getSuccess({ messages: res.docs }))
        .catch(error => actions.getFailed({ error })),
    ),
  ));

  constructor(private readonly _actions$: Actions) { }
}
