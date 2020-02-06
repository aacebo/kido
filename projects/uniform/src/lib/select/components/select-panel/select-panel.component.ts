import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'uni-select-panel',
  exportAs: 'uniSelectPanel',
  templateUrl: './select-panel.component.html',
  styleUrls: ['./select-panel.component.scss'],
  host: {
    class: 'uni-select-panel',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UniSelectPanelComponent {}
