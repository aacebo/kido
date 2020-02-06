import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'uni-dialog-footer',
  exportAs: 'uniDialogFooter',
  templateUrl: './dialog-footer.component.html',
  styleUrls: ['./dialog-footer.component.scss'],
  host: {
    class: 'uni-dialog-footer',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UniDialogFooterComponent {}
