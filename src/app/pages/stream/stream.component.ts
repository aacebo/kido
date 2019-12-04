import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ElectronService } from '../../core/services';
import { StreamModalService } from '../../features/stream';

import { IMessage, MessageService, MessageType } from '../../resources/message';
import { IStream, StreamService } from '../../resources/stream';
import { SystemService } from '../../resources/system';
import { UpdateService } from '../../resources/update';

@Component({
  selector: 'kido-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamComponent implements OnInit {
  readonly menu$ = new BehaviorSubject(true);

  constructor(
    readonly systemService: SystemService,
    readonly streamService: StreamService,
    readonly messageService: MessageService,
    readonly updateService: UpdateService,
    private readonly _electronService: ElectronService,
    private readonly _streamModalService: StreamModalService,
  ) { }

  ngOnInit() {
    this.streamService.get();
  }

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

  onSelectMessage(e?: IMessage) {
    this.messageService.setActive(e ? e._id : undefined);
  }

  onOpenMessage(e: IMessage) {
    this._electronService.send('open', {
      path: `/message/${e._id}`,
    });
  }

  onAdd(e: IStream) {
    this._streamModalService.open(e, (v?: Partial<IStream>) => {
      if (v) {
        if (e) {
          this.streamService.update({
            ...e,
            ...v,
          });
        } else {
          this.streamService.add(v.type, v.name, v.url, v.description);
        }
      }
    });
  }

  onRemove(e: IStream) {
    this.streamService.remove(e._id, e._rev);
  }

  onClear(e: IStream) {
    this.messageService.removeAll(e._id);
  }

  onMenu() {
    this.menu$.next(!this.menu$.value);
  }

  onSelected(e: IStream) {
    this.streamService.setActive(e._id);
  }
}
