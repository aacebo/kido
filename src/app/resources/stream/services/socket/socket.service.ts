import { Injectable } from '@angular/core';

import { WebSocketService, SocketIOService, SignalrService } from '../../../../core/services';
import { ISocketService } from '../../../../core/models';
import { StreamType } from '../../enums';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private _sockets: { [streamId: string]: ISocketService } = { };

  create(streamId: string, type: StreamType, url: string) {
    if (type === StreamType.WebSocket) {
      this._sockets[streamId] = new WebSocketService(url);
    } else if (type === StreamType.SocketIO) {
      this._sockets[streamId] = new SocketIOService(url);
    } else {
      this._sockets[streamId] = new SignalrService(url);
    }

    return this._sockets[streamId];
  }

  connect(streamId: string) {
    this._sockets[streamId].connect();
  }

  disconnect(streamId: string) {
    this._sockets[streamId].disconnect();
  }

  send(streamId: string, message: string, event?: string) {
    this._sockets[streamId].send(message, event);
  }

  isConnected(streamId: string) {
    return !this._sockets[streamId].disconnected;
  }
}
