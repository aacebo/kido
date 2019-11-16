import * as io from 'socket.io-client';

import { ISocketService } from '../../models';

export class SocketIOService implements ISocketService {
  get closed() { return this._socket$.disconnected; }

  private readonly _socket$: SocketIOClient.Socket;

  constructor(
    private readonly _url: string,
    private readonly _connect: () => void,
    private readonly _event: (v: any) => void,
    private readonly _disconnect: () => void,
  ) {
    this._socket$ = io(this._url, {
      autoConnect: false,
      reconnection: false,
    });

    this._socket$.on('connect', this._connect);
    this._socket$.on('event', this._event);
    this._socket$.on('disconnect', this._disconnect);
  }

  connect() {
    this._socket$.connect();
  }

  disconnect() {
    this._socket$.disconnect();
  }

  send(message: any) {
    this._socket$.send(message);
  }
}
