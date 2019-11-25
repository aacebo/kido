import { Component, ChangeDetectionStrategy, Input, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { areEqual, isValidJSON } from '../../../../core/utils';
import { IStream, StreamType } from '../../../../resources/stream';
import { IMessage } from '../../../../resources/message';
import { Hotkeys } from '../../../../ui/hotkeys';

import { STREAM_TYPE_LABELS } from '../../constants';
import { MessageAction } from '../../../../ui/messenger';

@Component({
  selector: 'kido-stream-detail',
  templateUrl: './stream-detail.component.html',
  styleUrls: ['./stream-detail.component.scss'],
  host: { class: 'stream-detail' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class StreamDetailComponent implements OnInit {
  @Input() messages: { [streamId: string]: IMessage[] } = { };
  @Input() connected?: Date;
  @Input() connecting?: boolean;
  @Input()
  get stream() { return this._stream; }
  set stream(v: IStream) {
    this._stream = v;

    if (this.form) {
      this.form.reset(this._formStream);
    }
  }
  private _stream: IStream;

  @Output() update = new EventEmitter<Partial<IStream>>();
  @Output() connect = new EventEmitter<void>();
  @Output() disconnect = new EventEmitter<void>();
  @Output() send = new EventEmitter<string>();
  @Output() deleteMessage = new EventEmitter<IMessage>();

  form: FormGroup;
  message?: IMessage;
  messageContent?: any;
  json = true;

  readonly STREAM_TYPE_LABELS = STREAM_TYPE_LABELS;
  readonly StreamType = StreamType;

  get areEqual() {
    return areEqual(this.form.value, this._formStream);
  }

  get isValidJSON() {
    return isValidJSON(this.form.value.message);
  }

  private get _formStream() {
    return {
      type: this.stream.type,
      name: this.stream.name,
      url: this.stream.url,
      description: this.stream.description,
      message: this.stream.message,
      event: this.stream.event,
      json: this.stream.json,
    };
  }

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.form = this._fb.group({
      type: this._fb.control(this.stream.type),
      name: this._fb.control(this.stream.name),
      url: this._fb.control(this.stream.url),
      description: this._fb.control(this.stream.description),
      message: this._fb.control(this.stream.message),
      event: this._fb.control(this.stream.event),
      json: this._fb.control(this.stream.json),
    });
  }

  @Hotkeys('ctrl+s', 'Save')
  save() {
    if (!this.form.invalid && !this.form.pristine && !this.areEqual) {
      this.update.emit({
        ...this.stream,
        ...this.form.value,
      });
    }
  }

  reset() {
    this.form.reset(this._formStream);
  }

  toggle() {
    if (this.connected) {
      this.disconnect.emit();
    } else {
      this.connect.emit();
    }
  }

  onPropertyValueClicked(e: string) {
    window.navigator.clipboard.writeText(e);
    this._toastr.info('Copied to Clipboard!');
  }

  onMessageSelected(e: IMessage) {
    this.message = e;
    this.messageContent = { root: e.json ? JSON.parse(e.content) : e.content };
  }

  onMessageAction(e: { message: IMessage; action: MessageAction }) {
    if (e.action === MessageAction.Delete) {
      this.deleteMessage.emit(e.message);
    }
  }

  onClearMessage() {
    this.message = undefined;
    this.messageContent = undefined;
  }
}
