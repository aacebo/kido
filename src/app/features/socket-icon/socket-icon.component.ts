import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { StreamType } from '../../resources/stream';
import { STREAM_TYPE_ABBR } from './stream-type-abbr.constant';

@Component({
  selector: 'kido-socket-icon',
  templateUrl: './socket-icon.component.html',
  styleUrls: ['./socket-icon.component.scss'],
  host: {
    class: 'kido-socket-icon',
    '[class.websocket]': 'type === StreamType.WebSocket',
    '[class.signalr]': 'type === StreamType.SignalR',
    '[class.socket-io]': 'type === StreamType.SocketIO',
    '[class.sockjs]': 'type === StreamType.SockJS',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocketIconComponent {
  @Input() type: StreamType;

  readonly StreamType = StreamType;
  readonly STREAM_TYPE_ABBR = STREAM_TYPE_ABBR;
}
