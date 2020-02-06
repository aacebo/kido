import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'uni-error',
  exportAs: 'uniError',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  host: {
    class: 'uni-error',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UniErrorComponent {}
