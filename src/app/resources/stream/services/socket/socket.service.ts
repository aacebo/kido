import { Injectable } from '@angular/core';

import { ISocketService } from '../../../../core/models';
import {
  SignalrService,
  SocketIOService,
  SockjsService,
  WebSocketService,
} from '../../../../core/services';
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
    } else if (type === StreamType.SignalR) {
      this._sockets[streamId] = new SignalrService(url);
    } else {
      this._sockets[streamId] = new SockjsService(url);
    }

    return this._sockets[streamId];
  }

  connect(streamId: string) {
    this._sockets[streamId].connect();
  }

  disconnect(streamId: string) {
    this._sockets[streamId].disconnect();
  }

  send(streamId: string, args: any | any[], event?: string) {
    this._sockets[streamId].send(args, event);
  }

  isConnected(streamId: string) {
    return !this._sockets[streamId].disconnected;
  }
}
