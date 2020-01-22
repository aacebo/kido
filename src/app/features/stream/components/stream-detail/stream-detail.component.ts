import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { take } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

import { IMessage } from '../../../../resources/message';
import { IStream, IStreamListener } from '../../../../resources/stream';

import { MessageAction } from '../../../../lib/messenger';
import { Hotkeys } from '../../../../lib/hotkeys';

import { arrayToMap } from '../../../../core/utils';

@Component({
  selector: 'kido-stream-detail',
  templateUrl: './stream-detail.component.html',
  styleUrls: ['./stream-detail.component.scss'],
  host: { class: 'stream-detail' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class StreamDetailComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() messages: { [streamId: string]: IMessage[] } = { };
  @Input() loading: { [streamId: string]: boolean } = { };
  @Input() connected: { [streamId: string]: Date } = { };
  @Input() connecting: { [streamId: string]: boolean } = { };
  @Input() eventable?: boolean;

  @Input()
  get activeMessageId() { return this._activeMessageId; }
  set activeMessageId(v: string) {
    this._activeMessageId = v;

    if (this.stream) {
      this.activeMessage = (this.messages[this.stream._id] || []).find(m => m._id === v);
    }
  }
  private _activeMessageId?: string;

  @Input()
  get stream() { return this._stream; }
  set stream(v: IStream) {
    this._stream = v;
    this.activeMessage = (this.messages[v._id] || []).find(m => m._id === this.activeMessageId);
  }
  private _stream: IStream;

  get activeMessage() { return this._activeMessage; }
  set activeMessage(v: IMessage) {
    this._activeMessage = v;
    this.activeMessageContent = v ? {
      root: v.json ? JSON.parse(v.content)
                   : v.content,
    } : undefined;
  }
  private _activeMessage?: IMessage;

  @Output() removeMessage = new EventEmitter<IMessage>();
  @Output() selectMessage = new EventEmitter<IMessage | undefined>();
  @Output() send = new EventEmitter<IStream>();

  @ViewChild(NgbTabset, { static: false })
  readonly tabset: NgbTabset;

  get notSendable() {
    return this.form.invalid ||
           !this.connected[this.stream._id];
  }

  get args() {
    return this.form.get('args') as FormArray;
  }

  get eventColors() {
    return this.form.value && Array.isArray(this.form.value.listeners) ?
      arrayToMap<IStreamListener>('label', this.form.value.listeners) :
      { };
  }

  activeMessageContent: any | string;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.form.get('event').setValue(this.stream.event);

    this.args.clear();
    for (const arg of this.stream.args) {
      this.args.push(this._fb.control({ ...arg }));
    }

    this.form.valueChanges.subscribe(() => this._cdr.markForCheck());
  }

  onPropertyValueClicked(e: string) {
    window.navigator.clipboard.writeText(e);
    this._toastr.info('Copied to Clipboard!');
  }

  onMessageAction(e: { message: IMessage; action: MessageAction }) {
    if (e.action === MessageAction.Delete) {
      this.removeMessage.emit(e.message);
    } else if (e.action === MessageAction.Copy) {
      this.onPropertyValueClicked(e.message.content);
    } else if (e.action === MessageAction.OpenSide) {
      this.selectMessage.emit(e.message);
    }
  }

  onClearMessage() {
    this.selectMessage.emit();
  }

  @Hotkeys('mod+enter', 'Send Message')
  onSend() {
    if (!this.notSendable) {
      this.send.emit({
        ...this.stream,
        ...this.form.value,
      });
    }
  }

  onAddArg() {
    this.args.push(this._fb.control({
      value: '',
      json: false,
    }));

    this.args.markAsDirty();
    this.args.updateValueAndValidity();
    this._cdr.markForCheck();

    this.tabset.tabs.changes.pipe(take(1)).subscribe(() => {
      this.tabset.select(this.tabset.tabs.last.id);
    });
  }

  onRemoveArg(e: Event, i: number) {
    e.stopImmediatePropagation();
    e.preventDefault();

    this.args.removeAt(i);
    this.args.markAsDirty();
    this.args.updateValueAndValidity();
    this._cdr.markForCheck();
  }
}
