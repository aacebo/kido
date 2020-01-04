import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { IMessage } from '../../../../resources/message';
import { IStream, StreamType } from '../../../../resources/stream';
import { MessageAction } from '../../../../lib/messenger';
import { isValidJSON } from '../../../../core/utils';

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

    if (this.form) {
      this.form.reset(this._formStream);
    }
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

  readonly StreamType = StreamType;
  activeMessageContent: any | string;

  get notSendable() {
    return this.form.invalid ||
           !this.form.value.message ||
           (this.form.value.json && !this._isValidJSON) ||
           !this.connected[this.stream._id];
  }

  private get _formStream() {
    return {
      type: this.stream.type,
      url: this.stream.url,
      message: this.stream.message,
      event: this.stream.event,
      json: this.stream.json,
    };
  }

  private get _isValidJSON() {
    return isValidJSON(this.form.value.message);
  }

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.form.addControl('message', this._fb.control(this.stream.message));
    this.form.addControl('event', this._fb.control(this.stream.event));
    this.form.addControl('json', this._fb.control(this.stream.json));
  }

  onJsonChanged(e: boolean) {
    this.form.get('json').setValue(!e);
    this.form.markAsDirty();
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

  onSend() {
    if (!this.notSendable) {
      this.send.emit({
        ...this.stream,
        ...this.form.value,
      });
    }
  }
}
