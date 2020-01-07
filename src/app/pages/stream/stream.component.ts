import { ChangeDetectionStrategy, Component, ViewEncapsulation, AfterViewInit, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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
export class StreamComponent implements OnInit, AfterViewInit {
  readonly menu$ = new BehaviorSubject(true);
  form: FormGroup;

  constructor(
    readonly systemService: SystemService,
    readonly streamService: StreamService,
    readonly messageService: MessageService,
    private readonly _streamModalService: StreamModalService,
    private readonly _route: ActivatedRoute,
    private readonly _fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this._fb.group({
      type: this._fb.control(null),
      url: this._fb.control(null),
      args: this._fb.array([]),
      event: this._fb.control(null),
    });
  }

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
    const args = e.args.map(v => v.json ? JSON.parse(v.value) : v.value);

    this.messageService.send(e._id, args, e.event);
    this.messageService.add(e._id, MessageType.Sent, JSON.stringify(args), e.event || 'message', true);
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
