import { Injectable } from '@angular/core';

import { WebSocketService } from '../../../../core/services';
import { ISocketService } from '../../../../core/models';
import { StreamType } from '../../enums';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private _sockets: { [streamId: string]: ISocketService } = { };

  create(
    streamId: string,
    type: StreamType,
    url: string,
    next: (v: any) => void,
    error: (v: any) => void,
    complete: () => void,
  ) {
    if (type === StreamType.WebSocket) {
      this._sockets[streamId] = new WebSocketService(
        url,
        next,
        error,
        complete,
      );
    }

    return this._sockets[streamId];
  }

  connect(streamId: string) {
    this._sockets[streamId].connect();
  }

  disconnect(streamId: string) {
    this._sockets[streamId].disconnect();
  }

  send(streamId: string, message: string) {
    this._sockets[streamId].send(message);
  }

  isConnected(streamId: string) {
    return !this._sockets[streamId].closed;
  }
}
