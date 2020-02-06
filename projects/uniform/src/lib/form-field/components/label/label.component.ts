import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'uni-label',
  exportAs: 'uniLabel',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  host: {
    class: 'uni-label',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UniLabelComponent {}
