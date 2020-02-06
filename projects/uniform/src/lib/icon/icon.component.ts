import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { UniIconService } from './icon.service';

@Component({
  moduleId: module.id,
  selector: 'uni-icon',
  exportAs: 'uniIcon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  host: {
    class: 'uni-icon',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UniIconComponent {
  @Input() icon: string;

  constructor(readonly iconService: UniIconService) {}
}
