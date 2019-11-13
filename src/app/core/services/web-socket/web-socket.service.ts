import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import { ISocketService } from '../../models';

export class WebSocketService implements ISocketService {
  get closed() { return this._socket$.closed; }

  private readonly _socket$: WebSocketSubject<any>;

  constructor(
    private readonly _url: string,
    private readonly _next: (v: any) => void,
    private readonly _error: (v: any) => void,
    private readonly _complete: () => void,
  ) {
    this._socket$ = webSocket(this._url);
  }

  connect() {
    this._socket$.subscribe({
      next: this._next,
      error: this._error,
      complete: this._complete,
    });
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
}
