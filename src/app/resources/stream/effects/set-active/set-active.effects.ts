import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, switchMap, map, take } from 'rxjs/operators';

import * as actions from '../../actions';
import { MessageService } from '../../../message';

@Injectable()
export class SetActiveEffects {
  readonly setActive$ = createEffect(() => this._actions$.pipe(
    ofType(actions.setActive),
    switchMap(a => this._messageService.messages$.pipe(
      take(1),
      map(v => ({
        streamId: a.streamId,
        messages: v ? v[a.streamId] : undefined,
      })),
    )),
    tap(a => {
      if (!a.messages) {
        this._messageService.get(a.streamId);
      }
    }),
  ), { dispatch: false });

  constructor(
    private readonly _actions$: Actions,
    private readonly _messageService: MessageService,
  ) { }
}
