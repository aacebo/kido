import * as signalr from '@aspnet/signalr';
import { Subject } from 'rxjs';

import { ISocketService } from '../../models';
import { SignalrLogger } from './signalr.logger';

export class SignalrService implements ISocketService {
  get disconnected() { return this._socket$.state === signalr.HubConnectionState.Disconnected; }
  get connected$() { return this._connected$.asObservable(); }
  get disconnected$() { return this._disconnected$.asObservable(); }
  get error$() { return this._error$.asObservable(); }
  get event$() { return this._event$.asObservable(); }

  private readonly _socket$: signalr.HubConnection;
  private readonly _connected$ = new Subject<void>();
  private readonly _disconnected$ = new Subject<void>();
  private readonly _error$ = new Subject<any>();
  private readonly _event$ = new Subject<{ e: string, v: any }>();
  private readonly _logger = new SignalrLogger();

  constructor(private readonly _url: string) {
    this._socket$ = new signalr.HubConnectionBuilder()
                               .withUrl(this._url)
                               .configureLogging(this._logger)
                               .build();

    this._logger.connected$.subscribe(this._onConnect.bind(this));
    this._logger.disconnected$.subscribe(this._onDisconnect.bind(this));
    this._logger.error$.subscribe(this._onError.bind(this));
    this._socket$.on('*', this._onEvent.bind(this));
  }

  connect() {
    this._socket$.start();
  }

  disconnect() {
    this._socket$.stop();
  }

  send(args: any[], event = 'message') {
    this._socket$.send(event, args);
  }

  private _onConnect() {
    this._connected$.next();
  }

  private _onDisconnect() {
    this._disconnected$.next();
  }

  private _onEvent(e: { event: string, value: any }) {
    // this._event$.next({
    //   e: e.event,
    //   v: e.value,
    // });
    console.log(e);
  }

  private _onError(err: any) {
    this._error$.next(err);
  }
}
