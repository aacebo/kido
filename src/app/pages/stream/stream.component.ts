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
    this.streamService.connect(e.type, e.url, (v) => {
      this.streamService.addMessage(e._id, StreamMessageType.Received, JSON.stringify(v));
    });
  }

  onSend(e: string, stream: IStream) {
    this.streamService.send(JSON.parse(e));
    this.streamService.addMessage(stream._id, StreamMessageType.Sent, e);
  }
}
