import { Component, ChangeDetectionStrategy, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { areEqual } from '../../../../core/utils';
import { StreamType, IStream } from '../../../../resources/stream';
import { STREAM_TYPE_LABELS } from '../../constants';

@Component({
  selector: 'kido-stream-detail-header',
  templateUrl: './stream-detail-header.component.html',
  styleUrls: ['./stream-detail-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamDetailHeaderComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() connected: { [streamId: string]: Date } = { };
  @Input() connecting: { [streamId: string]: boolean } = { };

  @Input()
  get stream() { return this._stream; }
  set stream(v: IStream) {
    this._stream = v;

    if (this.form) {
      this.form.reset(this._formStream);
    }
  }
  private _stream: IStream;

  @Output() save = new EventEmitter<void>();
  @Output() connect = new EventEmitter<void>();
  @Output() disconnect = new EventEmitter<void>();

  readonly STREAM_TYPE_LABELS = STREAM_TYPE_LABELS;
  readonly StreamType = StreamType;

  get changed() {
    return !areEqual(this.form.value, this._formStream);
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

  constructor(private readonly _fb: FormBuilder) { }

  ngOnInit() {
    this.form.addControl('type', this._fb.control(this.stream.type));
    this.form.addControl('url', this._fb.control(this.stream.url));
  }

  onReset() {
    this.form.reset(this._formStream);
  }

  onConnect() {
    const connected = !!this.connected[this.stream._id];

    if (connected) {
      this.disconnect.emit();
    } else {
      this.connect.emit();
    }
  }
}
