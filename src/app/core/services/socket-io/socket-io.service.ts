import { Subject } from 'rxjs';
import * as io from 'socket.io-client';

import { ISocketService } from '../../models';

export class SocketIOService implements ISocketService {
  get disconnected() { return this._socket$.disconnected; }
  get connected$() { return this._connected$.asObservable(); }
  get disconnected$() { return this._disconnected$.asObservable(); }
  get error$() { return this._error$.asObservable(); }
  get event$() { return this._event$.asObservable(); }

  private readonly _socket$: SocketIOClient.Socket;
  private readonly _connected$ = new Subject<void>();
  private readonly _disconnected$ = new Subject<void>();
  private readonly _error$ = new Subject<any>();
  private readonly _event$ = new Subject<{ e: string, v: any }>();

  constructor(private readonly _url: string) {
    this._socket$ = io(this._url, {
      autoConnect: false,
      reconnection: false,
    });

    this._socket$.on('connect', this._onConnect.bind(this));
    this._socket$.on('connect_error', this._onError.bind(this));
    this._socket$.on('error', this._onError.bind(this));
    this._socket$.on('disconnect', this._onDisconnect.bind(this));
  }

  connect(events: string[]) {
    for (const e of events) {
      this._socket$.on(e, (v: any) => this._onEvent(e, v));
    }

    this._socket$.connect();
  }

  disconnect() {
    this._socket$.disconnect();
  }

  send(args: any[], event = 'message') {
    this._socket$.emit(event, args);
  }

  private _onConnect() {
    this._connected$.next();
  }

  private _onDisconnect() {
    this._disconnected$.next();
  }

  private _onEvent(e: string, v: any) {
    this._event$.next({ e, v });
  }

  private _onError(err: any) {
    this._error$.next(err);
  }
}
