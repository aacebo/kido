import { Component, ChangeDetectionStrategy, Input, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { areEqual, isValidJSON } from '../../../../core/utils';
import { IStream, IStreamMessage, StreamType } from '../../../../resources/stream';
import { Hotkeys } from '../../../../ui/hotkeys';

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
  @Input() messages: IStreamMessage[] = [];
  @Input() connected?: boolean;
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

  form: FormGroup;
  json?: any;

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

  onMessageSelected(e: IStreamMessage) {
    this.json = { root: JSON.parse(e.content) };
  }

  onPropertyValueClicked(e: string) {
    window.navigator.clipboard.writeText(e);
    this._toastr.info('Copied to Clipboard!');
  }

  onClearJson() {
    this.json = undefined;
  }
}
