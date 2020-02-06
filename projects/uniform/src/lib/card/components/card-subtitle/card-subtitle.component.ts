import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'uni-card-subtitle',
  exportAs: 'uniCardSubtitle',
  templateUrl: './card-subtitle.component.html',
  styleUrls: ['./card-subtitle.component.scss'],
  host: {
    class: 'uni-card-subtitle',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UniCardSubtitleComponent {}
