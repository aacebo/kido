import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import * as actions from '../../actions';
import { isValidJSON } from '../../../../core/utils';
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
      socket.event$.subscribe(e => this._onEvent(e, a));

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
    this._store$.dispatch(actions.connectStreamFailed({ error, streamId: a.streamId }));
    this._streamService.disconnect(a.streamId);
  }

  private _onEvent(e: { e: string, v: any }, a: { streamId: string; }) {
    const json = typeof e.v === 'object' && isValidJSON(JSON.stringify(e.v, undefined, 2));
    this._streamService.addMessage(
      a.streamId,
      StreamMessageType.Received,
      json ? JSON.stringify(e.v, undefined, 2) : e.v,
      e.e,
      json,
    );
  }

  constructor(
    private readonly _actions$: Actions,
    private readonly _store$: Store<IStreamState>,
    private readonly _socketService: SocketService,
    private readonly _streamService: StreamService,
    private readonly _toastr: ToastrService,
  ) { }
}
