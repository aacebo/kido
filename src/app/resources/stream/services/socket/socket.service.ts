import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { ToastrService } from 'ngx-toastr';

import { StreamType } from '../../enums';

export class SocketService {
  private _socket$?: WebSocketSubject<any>;

  constructor(private readonly _toastr: ToastrService) { }

  connect(type: StreamType, url: string, cb: (..._: any) => void) {
    if (type === StreamType.WebSocket) {
      this._socket$ = webSocket(url);
      this._toastr.success('Connected', 'Socket');
      this._socket$.subscribe(
        v => cb(v),
        () => this._toastr.error('An error occurred', 'Socket'),
        () => this._toastr.info('Disconnected', 'Socket'),
      );
    }
  }

  disconnect() {
    this._socket$.complete();
  }

  send(message: string) {
    this._socket$.next(message);
  }
}
