import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { ToastrService } from 'ngx-toastr';

import { StreamType } from '../../enums';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private _sockets: { [streamId: string]: WebSocketSubject<any> } = { };

  constructor(private readonly _toastr: ToastrService) { }

  connect(streamId: string, type: StreamType, url: string, cb: (..._: any) => void) {
    if (type === StreamType.WebSocket) {
      this._sockets[streamId] = webSocket(url);
      this._toastr.success('Connected', 'Socket');
      this._sockets[streamId].subscribe(
        v => cb(v),
        () => this._toastr.error('An error occurred', 'Socket'),
        () => this._toastr.warning('Disconnected', 'Socket'),
      );
    }
  }

  disconnect(streamId: string) {
    this._sockets[streamId].complete();
  }

  send(streamId: string, message: string) {
    this._sockets[streamId].next(message);
  }
}
