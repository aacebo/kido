import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'uni-card-title',
  exportAs: 'uniCardTitle',
  templateUrl: './card-title.component.html',
  styleUrls: ['./card-title.component.scss'],
  host: {
    class: 'uni-card-title',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UniCardTitleComponent {}
