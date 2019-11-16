import { Injectable } from '@angular/core';

import { WebSocketService, SocketIOService } from '../../../../core/services';
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
    one: (v?: any) => void,
    two: (v: any) => void,
    three: () => void,
  ) {
    if (type === StreamType.WebSocket) {
      this._sockets[streamId] = new WebSocketService(
        url,
        one,
        two,
        three,
      );
    } else if (type === StreamType.SocketIO) {
      this._sockets[streamId] = new SocketIOService(
        url,
        one,
        two,
        three,
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
