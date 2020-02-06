import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'uni-dialog-content',
  exportAs: 'uniDialogContent',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss'],
  host: {
    class: 'uni-dialog-content',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UniDialogContentComponent {}
