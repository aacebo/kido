import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IMessage, MessageService, MessageType } from '../../resources/message';
import { IStream, StreamService } from '../../resources/stream';

@Component({
  selector: 'kido-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamComponent {
  constructor(
    readonly streamService: StreamService,
    readonly messageService: MessageService,
  ) { }

  onUpdate(e: Partial<IStream>) {
    this.streamService.update(e);
  }

  onConnect(e: IStream) {
    this.streamService.connect(e._id, e.type, e.url);
  }

  onDisconnect(e: IStream) {
    this.streamService.disconnect(e._id);
  }

  onSend(e: string, stream: IStream) {
    this.messageService.send(stream._id, stream.json ? JSON.parse(e) : e, stream.event, stream.json);
    this.messageService.add(stream._id, MessageType.Sent, e, stream.event || 'message', stream.json);
  }

  onDeleteMessage(e: IMessage) {
    this.messageService.remove(e.streamId, e._id);
  }
}
