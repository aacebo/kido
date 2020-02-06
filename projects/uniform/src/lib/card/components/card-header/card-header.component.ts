import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'uni-card-header',
  exportAs: 'uniCardHeader',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss'],
  host: {
    class: 'uni-card-header',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UniCardHeaderComponent {}
