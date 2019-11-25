import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { StreamType, IStream } from '../../../../resources/stream';
import { STREAM_TYPE_LABELS } from '../../constants';

@Component({
  selector: 'kido-stream-modal',
  templateUrl: './stream-modal.component.html',
  styleUrls: ['./stream-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamModalComponent implements OnInit {
  @Input() stream?: IStream;

  form: FormGroup;

  readonly StreamType = StreamType;
  readonly STREAM_TYPE_LABELS = STREAM_TYPE_LABELS;

  constructor(
    private readonly _modal: NgbActiveModal,
    private readonly _fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this._fb.group({
      type: this._fb.control(this.stream ? this.stream.type : undefined),
      name: this._fb.control(this.stream ? this.stream.name : undefined),
      url: this._fb.control(this.stream ? this.stream.url : undefined),
      description: this._fb.control(this.stream ? this.stream.description : undefined),
    });
  }

  close() {
    this._modal.close();
  }

  save() {
    this._modal.close(this.form.value);
  }
}
