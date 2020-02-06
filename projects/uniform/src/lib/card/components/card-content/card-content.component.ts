import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'uni-card-content',
  exportAs: 'uniCardContent',
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.scss'],
  host: {
    class: 'uni-card-content',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UniCardContentComponent {}
