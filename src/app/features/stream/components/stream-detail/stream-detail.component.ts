import { Component, ChangeDetectionStrategy, Input, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { areEqual } from '../../../../core/utils';
import { IStream, IStreamMessage, StreamType } from '../../../../resources/stream';
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

  form: FormGroup;
  json = {
    test: 1,
    test2: true,
    test3: new Date(),
    test4: 'testing123',
    test5: {
      anothertest: 'lol',
    },
    test6: [
      'test',
      {
        'test-this': {
          0: 1,
        },
      },
    ],
    test7: undefined,
    test8: null,
  };

  readonly STREAM_TYPE_LABELS = STREAM_TYPE_LABELS;
  readonly StreamType = StreamType;

  get areEqual() {
    return areEqual(this.form.value, this._formStream);
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

  constructor(private readonly _fb: FormBuilder) { }

  ngOnInit() {
    this.form = this._fb.group({
      type: this._fb.control(this.stream.type),
      name: this._fb.control(this.stream.name),
      url: this._fb.control(this.stream.url),
      description: this._fb.control(this.stream.description),
      message: this._fb.control(this.stream.message),
    });
  }

  save() {
    this.update.emit({
      ...this.stream,
      ...this.form.value,
    });
  }

  reset() {
    this.form.reset(this._formStream);
  }
}
