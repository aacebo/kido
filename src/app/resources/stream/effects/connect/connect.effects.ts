import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';

import { isValidJSON } from '../../../../core/utils';
import { MessageService, MessageType } from '../../../message';
import * as actions from '../../actions';
import { SocketService, StreamService } from '../../services';
import { IStreamState } from '../../stream.state';

@Injectable()
export class ConnectEffects {
  readonly connect$ = createEffect(() => this._actions$.pipe(
    ofType(actions.connect),
    tap(a => {
      const socket = this._socketService.create(a.streamId, a.streamType, a.url);

      socket.connected$.subscribe(() => this._onConnect(a));
      socket.disconnected$.subscribe(() => this._onDisconnect(a));
      socket.error$.subscribe(err => this._onError(err, a));
      socket.event$.subscribe(e => this._onEvent(e, a));

      this._socketService.connect(a.streamId);
    }),
  ), { dispatch: false });

  readonly connectFailed$ = createEffect(() => this._actions$.pipe(
    ofType(actions.connectFailed),
    tap(() => this._toastr.error('Error', 'Socket')),
  ), { dispatch: false });

  constructor(
    private readonly _actions$: Actions,
    private readonly _store$: Store<IStreamState>,
    private readonly _socketService: SocketService,
    private readonly _streamService: StreamService,
    private readonly _messageService: MessageService,
    private readonly _toastr: ToastrService,
  ) { }

  private _onConnect(a: { streamId: string; }) {
    this._store$.dispatch(actions.connectSuccess(a));
  }

  private _onDisconnect(a: { streamId: string; }) {
    this._streamService.disconnect(a.streamId);
    this._messageService.save(a.streamId);
  }

  private _onError(error: Error, a: { streamId: string; }) {
    this._store$.dispatch(actions.connectFailed({ error, streamId: a.streamId }));
    this._streamService.disconnect(a.streamId);
    this._messageService.save(a.streamId);
  }

  private _onEvent(e: { e: string, v: any }, a: { streamId: string; }) {
    const json = typeof e.v === 'object' && isValidJSON(JSON.stringify(e.v, undefined, 2));
    this._messageService.add(
      a.streamId,
      MessageType.Received,
      json ? JSON.stringify(e.v, undefined, 2) : e.v,
      e.e,
      json,
    );
  }
}
