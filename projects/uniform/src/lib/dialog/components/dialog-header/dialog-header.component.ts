import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'uni-dialog-header',
  exportAs: 'uniDialogHeader',
  templateUrl: './dialog-header.component.html',
  styleUrls: ['./dialog-header.component.scss'],
  host: {
    class: 'uni-dialog-header',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UniDialogHeaderComponent {}
