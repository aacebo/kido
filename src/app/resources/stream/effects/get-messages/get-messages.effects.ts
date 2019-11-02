import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';

import * as actions from '../../actions';
import { PouchService } from '../../../../core/services';
import { IStreamMessage } from '../../models';

@Injectable()
export class GetMessagesEffects {
  private readonly _pouchService = new PouchService<IStreamMessage>('messages');

  readonly messages$ = createEffect(() => this._actions$.pipe(
    ofType(actions.getMessages),
    switchMap(() =>
      this._pouchService.get()
        .then(res => actions.getMessagesSuccess({ messages: res.docs }))
        .catch(error => actions.getMessagesFailed({ error })),
    ),
  ));

  constructor(private readonly _actions$: Actions) { }
}
