import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

import { ElectronService } from '../../core/services';

import { StreamModalService } from '../../features/stream';

import { IMessage, MessageService, MessageType } from '../../resources/message';
import { IStream, StreamService } from '../../resources/stream';
import { SystemService } from '../../resources/system';

@Component({
  selector: 'kido-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss'],
  host: { class: 'kido-stream' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamComponent implements OnInit {
  readonly menu$ = new BehaviorSubject(true);
  readonly form = new FormGroup({ });

  constructor(
    readonly systemService: SystemService,
    readonly streamService: StreamService,
    readonly messageService: MessageService,
    private readonly _electronService: ElectronService,
    private readonly _streamModalService: StreamModalService,
  ) { }

  ngOnInit() {
    this.streamService.get();
  }

  onSave(e: IStream) {
    this.streamService.update({
      ...e,
      ...this.form.value,
    });
  }

  onConnect(e: IStream) {
    this.streamService.connect(e._id, e.type, e.url);
  }

  onDisconnect(e: IStream) {
    this.streamService.disconnect(e._id);
  }

  onSend(e: IStream) {
    this.messageService.send(e._id, e.json ? JSON.parse(e.message) : e.message, e.event, e.json);
    this.messageService.add(e._id, MessageType.Sent, e.message, e.event || 'message', e.json);
  }

  onRemoveMessage(e: IMessage) {
    this.messageService.remove(e.streamId, e._id, e._rev);
  }

  onSelectMessage(e?: IMessage) {
    this.messageService.setActive(e ? e._id : undefined);
  }

  onOpenMessage(e: IMessage) {
    this._electronService.send('open', {
      path: `/message/${e._id}`,
    });
  }

  onStreamTabChange(e: NgbTabChangeEvent) {
    this.messageService.messages$.pipe(take(1)).subscribe(msgs => {
      if (!msgs[e.nextId]) {
        this.messageService.get(e.nextId);
      }
    });
  }

  onOpenLogs() {
    this._electronService.send('open', {
      path: '/logs',
    });
  }

  onAdd(e?: IStream) {
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
}
