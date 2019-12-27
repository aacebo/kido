import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import * as actions from '../../actions';
import { SocketService } from '../../services';

@Injectable()
export class DisconnectEffects {
  readonly disconnect$ = createEffect(() => this._actions$.pipe(
    ofType(actions.disconnect),
    tap(a => {
      if (this._socketService.isConnected(a.streamId)) {
        this._socketService.disconnect(a.streamId);
      }
    }),
  ), { dispatch: false });

  constructor(
    private readonly _actions$: Actions,
    private readonly _socketService: SocketService,
  ) { }
}
