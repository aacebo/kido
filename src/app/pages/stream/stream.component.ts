import { ChangeDetectionStrategy, Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

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
export class StreamComponent implements AfterViewInit {
  readonly menu$ = new BehaviorSubject(true);
  readonly form = new FormGroup({ });

  constructor(
    readonly systemService: SystemService,
    readonly streamService: StreamService,
    readonly messageService: MessageService,
    private readonly _streamModalService: StreamModalService,
    private readonly _route: ActivatedRoute,
  ) { }

  ngAfterViewInit() {
    this.messageService.get(this._route.snapshot.data.activeId);
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
    const args = e.args.map(v => ({
      json: v.json,
      value: v.json ? JSON.parse(v.value) : v.value,
    }));

    this.messageService.send(e._id, args, e.event);
    this.messageService.add(e._id, MessageType.Sent, e.args, e.event || 'message');
  }

  onRemoveMessage(e: IMessage) {
    this.messageService.remove(e.streamId, e._id, e._rev);
  }

  onSelectMessage(e?: IMessage) {
    this.messageService.setActive(e ? e._id : undefined);
  }

  onStreamTabChange(e: NgbTabChangeEvent) {
    this.messageService.messages$.pipe(take(1)).subscribe(msgs => {
      if (!msgs[e.nextId]) {
        this.messageService.get(e.nextId);
      }
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

  onRemove(e: Event, stream: IStream) {
    e.preventDefault();
    e.stopImmediatePropagation();
    this.streamService.remove(stream._id, stream._rev);
  }

  onClear(e: IStream) {
    this.messageService.removeAll(e._id);
  }

  onMenu() {
    this.menu$.next(!this.menu$.value);
  }
}
