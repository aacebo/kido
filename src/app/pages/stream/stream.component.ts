import { ChangeDetectionStrategy, Component, ViewEncapsulation, AfterViewInit, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

import { IMessage, MessageService, MessageType } from '../../resources/message';
import { IStream, StreamService, StreamType } from '../../resources/stream';
import { SystemService } from '../../resources/system';
import { Hotkeys, HotkeyBase } from '../../lib/hotkeys';

@Component({
  selector: 'kido-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss'],
  host: { class: 'kido-stream' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamComponent extends HotkeyBase implements OnInit, AfterViewInit {
  readonly menu$ = new BehaviorSubject(true);
  form: FormGroup;

  get eventable() {
    return this.form &&
           this.form.value &&
           this.form.value.type !== StreamType.WebSocket &&
           this.form.value.type !== StreamType.SockJS;
  }

  constructor(
    readonly systemService: SystemService,
    readonly streamService: StreamService,
    readonly messageService: MessageService,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _fb: FormBuilder,
  ) { super(); }

  ngOnInit() {
    this.form = this._fb.group({
      type: this._fb.control(null),
      url: this._fb.control(null),
      event: this._fb.control(null),
      args: this._fb.array([]),
      listeners: this._fb.control([]),
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
    this.streamService.connect(e._id, this.form.value.type, this.form.value.url, this.form.value.listeners);
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

  @Hotkeys('mod+n', 'New')
  onAdd() {
    this.streamService.add(StreamType.WebSocket, 'New Stream');
  }

  onRemove(e: Event, stream: IStream) {
    e.preventDefault();
    e.stopImmediatePropagation();

    this.streamService.entities$.pipe(
      take(1),
      tap(entities => {
        if (entities.length === 1) {
          this._router.navigateByUrl('/landing');
        }

        this.streamService.remove(stream._id, stream._rev);
      }),
    ).subscribe();
  }

  onClear(e: IStream) {
    this.messageService.removeAll(e._id);
  }

  onMenu() {
    this.menu$.next(!this.menu$.value);
  }
}
