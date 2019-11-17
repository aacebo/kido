import { Component, ChangeDetectionStrategy } from '@angular/core';

import { StreamService, IStream, StreamMessageType } from '../../resources/stream';

@Component({
  selector: 'kido-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamComponent {
  constructor(readonly streamService: StreamService) { }

  onUpdate(e: Partial<IStream>) {
    this.streamService.updateStream(e);
  }

  onConnect(e: IStream) {
    this.streamService.connect(e._id, e.type, e.url);
  }

  onDisconnect(e: IStream) {
    this.streamService.disconnect(e._id);
  }

  onSend(e: string, stream: IStream) {
    this.streamService.sendMessage(stream._id, JSON.parse(e), stream.event);
    this.streamService.addMessage(stream._id, StreamMessageType.Sent, e);
  }
}
