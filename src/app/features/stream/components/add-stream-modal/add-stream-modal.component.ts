import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { StreamType } from '../../../../resources/stream';

@Component({
  selector: 'kido-add-stream-modal',
  templateUrl: './add-stream-modal.component.html',
  styleUrls: ['./add-stream-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddStreamModalComponent implements OnInit {
  @Input() type?: StreamType;

  form: FormGroup;

  constructor(
    private readonly _modal: NgbActiveModal,
    private readonly _fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this._fb.group({
      type: this._fb.control(this.type),
      name: this._fb.control(undefined),
      url: this._fb.control(undefined),
      description: this._fb.control(undefined),
    });
  }

  close() {
    this._modal.close();
  }

  save() {
    this._modal.close(this.form.value);
  }
}
