import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import * as actions from '../../actions';
import { SocketService, StreamService } from '../../services';
import { StreamMessageType } from '../../enums';
import { IStreamState } from '../../stream.state';

@Injectable()
export class ConnectStreamEffects {
  readonly connectStream$ = createEffect(() => this._actions$.pipe(
    ofType(actions.connectStream),
    tap(a => {
      const socket = this._socketService.create(a.streamId, a.streamType, a.url);

      socket.connected$.subscribe(() => this._onConnect(a));
      socket.disconnected$.subscribe(() => this._onDisconnect(a));
      socket.error$.subscribe(err => this._onError(err, a));
      socket.event$.subscribe(v => this._onEvent(v, a));

      this._socketService.connect(a.streamId);
    }),
  ), { dispatch: false });

  readonly connectStreamSuccess$ = createEffect(() => this._actions$.pipe(
    ofType(actions.connectStreamSuccess),
    tap(() => this._toastr.success('Connected', 'Socket')),
  ), { dispatch: false });

  readonly connectStreamFailed$ = createEffect(() => this._actions$.pipe(
    ofType(actions.connectStreamFailed),
    tap(() => this._toastr.error('Error', 'Socket')),
  ), { dispatch: false });

  private _onConnect(a: { streamId: string; }) {
    this._store$.dispatch(actions.connectStreamSuccess(a));
  }

  private _onDisconnect(a: { streamId: string; }) {
    this._streamService.disconnect(a.streamId);
  }

  private _onError(error: Error, a: { streamId: string; }) {
    this._store$.dispatch(actions.connectStreamFailed({ error }));
    this._streamService.disconnect(a.streamId);
  }

  private _onEvent(v: any, a: { streamId: string; }) {
    this._streamService.addMessage(a.streamId, StreamMessageType.Received, JSON.stringify(v));
  }

  constructor(
    private readonly _actions$: Actions,
    private readonly _store$: Store<IStreamState>,
    private readonly _socketService: SocketService,
    private readonly _streamService: StreamService,
    private readonly _toastr: ToastrService,
  ) { }
}
