import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import * as actions from '../../actions';
import { SocketService } from '../../services';

@Injectable()
export class DisconnectStreamEffects {
  readonly disconnectStream$ = createEffect(() => this._actions$.pipe(
    ofType(actions.disconnectStream),
    tap(a => {
      if (this._socketService.isConnected(a.streamId)) {
        this._socketService.disconnect(a.streamId);
        this._toastr.warning('Disconnected', 'Socket');
      }
    }),
  ), { dispatch: false });

  constructor(
    private readonly _actions$: Actions,
    private readonly _socketService: SocketService,
    private readonly _toastr: ToastrService,
  ) { }
}
