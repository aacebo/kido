import SockJS from 'sockjs-client';
import { Subject } from 'rxjs';

import { ISocketService } from '../../models';

export class SockjsService implements ISocketService {
  get disconnected() { return this._socket$.readyState === this._socket$.CLOSED; }
  get connected$() { return this._connected$.asObservable(); }
  get disconnected$() { return this._disconnected$.asObservable(); }
  get error$() { return this._error$.asObservable(); }
  get event$() { return this._event$.asObservable(); }

  private _socket$: WebSocket;
  private readonly _connected$ = new Subject<void>();
  private readonly _disconnected$ = new Subject<void>();
  private readonly _error$ = new Subject<any>();
  private readonly _event$ = new Subject<{ e: string, v: any }>();

  constructor(private readonly _url: string) { }

  connect() {
    this._socket$ = new SockJS(this._url);
    this._socket$.onopen = this._onConnect.bind(this);
    this._socket$.onerror = this._onError.bind(this);
    this._socket$.onclose = this._onDisconnect.bind(this);
    this._socket$.onmessage = this._onEvent.bind(this);
  }

  disconnect() {
    this._socket$.close();
  }

  send(message: any) {
    this._socket$.send(message);
  }

  private _onEvent(v: any) {
    this._event$.next({ e: 'message', v });
  }

  private _onConnect() {

  }

  private _onDisconnect() {
    this._disconnected$.next();
  }

  private _onError(err: any) {
    this._error$.next(err);
  }
}
