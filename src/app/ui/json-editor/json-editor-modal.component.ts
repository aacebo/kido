import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
  @Input() value: string;
  @Input() raw: boolean;

  constructor(private readonly _modal: NgbActiveModal) { }

  save() {
    this._modal.close(this.value);
  }
}
