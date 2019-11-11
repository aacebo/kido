import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import * as actions from '../../actions';
import { SocketService } from '../../services';

@Injectable()
export class ConnectStreamEffects {
  private readonly _socketService: SocketService;

  readonly connectStream$ = createEffect(() => this._actions$.pipe(
    ofType(actions.connectStream),
    tap(a => this._socketService.connect(a.streamType, a.url, a.cb)),
  ), { dispatch: false });

  readonly disconnectStream$ = createEffect(() => this._actions$.pipe(
    ofType(actions.disconnectStream),
    tap(() => this._socketService.disconnect()),
  ), { dispatch: false });

  readonly sendStream$ = createEffect(() => this._actions$.pipe(
    ofType(actions.sendStream),
    tap(a => this._socketService.send(a.message)),
  ), { dispatch: false });

  constructor(
    private readonly _actions$: Actions,
    private readonly _toastr: ToastrService,
  ) {
    this._socketService = new SocketService(this._toastr);
  }
}
