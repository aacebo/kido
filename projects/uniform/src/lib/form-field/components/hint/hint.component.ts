import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'uni-hint',
  exportAs: 'uniHint',
  templateUrl: './hint.component.html',
  styleUrls: ['./hint.component.scss'],
  host: {
    class: 'uni-hint',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UniHintComponent {}
