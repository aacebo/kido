import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import * as actions from '../../actions';
import { SocketService, StreamService } from '../../services';
import { StreamMessageType, StreamType } from '../../enums';

@Injectable()
export class ConnectStreamEffects {
  readonly connectStream$ = createEffect(() => this._actions$.pipe(
    ofType(actions.connectStream),
    tap(a => {
      const socket = this._socketService.create(
        a.streamId,
        a.streamType,
        a.url,
        v => {
          if (a.streamType === StreamType.WebSocket) {
            this._onMessage(v, a);
          } else if (a.streamType === StreamType.SocketIO) {
            console.log('connected');
            this._onConnect();
          }
        },
        v => {
          if (a.streamType === StreamType.WebSocket) {
            this._onError(a);
          } else if (a.streamType === StreamType.SocketIO) {
            this._onMessage(v, a);
          }
        },
        () => {
          this._onDisconnect(a);
        },
      );

      this._socketService.connect(a.streamId);

      if (!socket.closed && a.streamType === StreamType.WebSocket) {
        this._onConnect();
      }
    }),
  ), { dispatch: false });

  readonly disconnectStream$ = createEffect(() => this._actions$.pipe(
    ofType(actions.disconnectStream),
    tap(a => {
      if (this._socketService.isConnected(a.streamId)) {
        this._socketService.disconnect(a.streamId);
      }
    }),
  ), { dispatch: false });

  readonly sendStream$ = createEffect(() => this._actions$.pipe(
    ofType(actions.sendStream),
    tap(a => this._socketService.send(a.streamId, a.message)),
  ), { dispatch: false });

  private _onConnect() {
    this._toastr.success('Connected', 'Socket');
  }

  private _onDisconnect(a: { streamId: string; }) {
    this._toastr.warning('Disconnected', 'Socket');
    this._streamService.disconnect(a.streamId);
  }

  private _onMessage(v: any, a: { streamId: string; }) {
    this._streamService.addMessage(a.streamId, StreamMessageType.Received, JSON.stringify(v));
  }

  private _onError(a: { streamId: string; }) {
    this._toastr.error('Error', 'Socket');
    this._streamService.disconnect(a.streamId);
  }

  constructor(
    private readonly _actions$: Actions,
    private readonly _socketService: SocketService,
    private readonly _streamService: StreamService,
    private readonly _toastr: ToastrService,
  ) { }
}
