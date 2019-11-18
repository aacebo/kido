import { Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import { ISocketService } from '../../models';

export class WebSocketService implements ISocketService {
  get disconnected() { return this._socket$.closed; }
  get connected$() { return this._connected$.asObservable(); }
  get disconnected$() { return this._disconnected$.asObservable(); }
  get error$() { return this._error$.asObservable(); }
  get event$() { return this._event$.asObservable(); }

  private readonly _socket$: WebSocketSubject<any>;
  private readonly _connected$ = new Subject<void>();
  private readonly _disconnected$ = new Subject<void>();
  private readonly _error$ = new Subject<any>();
  private readonly _event$ = new Subject<{ e: string, v: any }>();
  private readonly _maxConnectionChecks = 50;
  private _checks = 0;

  constructor(private readonly _url: string) {
    this._socket$ = webSocket(this._url);
  }

  connect() {
    this._socket$.subscribe({
      next: this._onNext.bind(this),
      error: this._onError.bind(this),
      complete: this._onComplete.bind(this),
    });

    this._onConnect();
  }

  disconnect() {
    this._socket$.unsubscribe();
  }

  destroy() {
    this._socket$.complete();
  }

  send(message: any) {
    this._socket$.next(message);
  }

  private _onNext(v: any) {
    this._event$.next({ e: 'message', v });
  }

  private _onComplete() {
    this._disconnected$.next();
  }

  private _onError(err: any) {
    this._error$.next(err);
  }

  private _onConnect() {
    setTimeout(() => {
      if (!this._socket$.closed && !this._socket$.isStopped && !this._socket$.hasError) {
        this._connected$.next();
      } else if (this._checks < this._maxConnectionChecks) {
        this._onConnect();
      } else {
        this._checks = 0;
      }
    }, 100);
  }
}
