import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import * as actions from '../../actions';
import { SocketService } from '../../services';

@Injectable()
export class ConnectStreamEffects {
  readonly connectStream$ = createEffect(() => this._actions$.pipe(
    ofType(actions.connectStream),
    tap(a => this._socketService.connect(a.streamId, a.streamType, a.url, a.cb)),
  ), { dispatch: false });

  readonly disconnectStream$ = createEffect(() => this._actions$.pipe(
    ofType(actions.disconnectStream),
    tap(a => this._socketService.disconnect(a.streamId)),
  ), { dispatch: false });

  readonly sendStream$ = createEffect(() => this._actions$.pipe(
    ofType(actions.sendStream),
    tap(a => this._socketService.send(a.streamId, a.message)),
  ), { dispatch: false });

  constructor(
    private readonly _actions$: Actions,
    private readonly _socketService: SocketService,
  ) { }
}
