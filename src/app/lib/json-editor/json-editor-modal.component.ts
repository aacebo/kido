import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IJsonEditorValue } from './json-editor-value.interface';

@Component({
  moduleId: module.id,
  exportAs: 'kidoJsonEditorModal',
  selector: 'kido-json-editor-modal',
  templateUrl: './json-editor-modal.component.html',
  styleUrls: ['./json-editor-modal.component.scss'],
  host: { class: 'kido-json-editor-modal' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonEditorModalComponent {
  @Input() value: IJsonEditorValue;

  constructor(private readonly _modal: NgbActiveModal) { }

  save() {
    this._modal.close(this.value);
  }
}
