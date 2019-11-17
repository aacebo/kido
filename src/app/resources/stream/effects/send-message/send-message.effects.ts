import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import * as actions from '../../actions';
import { SocketService } from '../../services';

@Injectable()
export class SendMessageEffects {
  readonly sendMessage$ = createEffect(() => this._actions$.pipe(
    ofType(actions.sendMessage),
    tap(a => this._socketService.send(a.streamId, a.message)),
  ), { dispatch: false });

  constructor(
    private readonly _actions$: Actions,
    private readonly _socketService: SocketService,
  ) { }
}
