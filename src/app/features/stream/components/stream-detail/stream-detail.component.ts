import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { areEqual, isValidJSON } from '../../../../core/utils';
import { IMessage } from '../../../../resources/message';
import { IStream, StreamType } from '../../../../resources/stream';
import { Hotkeys } from '../../../../lib/hotkeys';

import { MessageAction } from '../../../../lib/messenger';
import { STREAM_TYPE_LABELS } from '../../constants';

@Component({
  selector: 'kido-stream-detail',
  templateUrl: './stream-detail.component.html',
  styleUrls: ['./stream-detail.component.scss'],
  host: { class: 'stream-detail' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class StreamDetailComponent implements OnInit {
  @Input() activeMessage?: IMessage;
  @Input() activeMessageContent?: any;
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
  @Output() connect = new EventEmitter<IStream>();
  @Output() disconnect = new EventEmitter<void>();
  @Output() send = new EventEmitter<IStream>();
  @Output() deleteMessage = new EventEmitter<IMessage>();
  @Output() selectMessage = new EventEmitter<IMessage | undefined>();
  @Output() openMessage = new EventEmitter<IMessage>();

  readonly STREAM_TYPE_LABELS = STREAM_TYPE_LABELS;
  readonly StreamType = StreamType;

  form: FormGroup;

  get areEqual() {
    return areEqual(this.form.value, this._formStream);
  }

  get isValidJSON() {
    return isValidJSON(this.form.value.message);
  }

  get notSendable() {
    return this.form.invalid ||
           !this.form.value.message ||
           (this.form.value.json && !this.isValidJSON) ||
           !this.connected;
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

  @Hotkeys('mod+s', 'Save')
  save() {
    if (!this.form.invalid && !this.form.pristine && !this.areEqual) {
      this.update.emit({
        ...this.stream,
        ...this.form.value,
      });
    }
  }

  @Hotkeys('mod+f', 'Format')
  format() {
    if (this.isValidJSON) {
      const ctrl = this.form.get('message');
      ctrl.setValue(JSON.stringify(JSON.parse(ctrl.value), undefined, 2));
    }
  }

  @Hotkeys('mod+enter', 'Send Message')
  sendMessage() {
    if (!this.notSendable) {
      this.send.emit({
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
      this.connect.emit({
        ...this.stream,
        ...this.form.value,
      });
    }
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
      this.deleteMessage.emit(e.message);
    } else if (e.action === MessageAction.Copy) {
      this.onPropertyValueClicked(e.message.content);
    } else if (e.action === MessageAction.OpenSide) {
      this.selectMessage.emit(e.message);
    } else if (e.action === MessageAction.Open) {
      this.openMessage.emit(e.message);
    }
  }

  onClearMessage() {
    this.selectMessage.emit();
  }
}
