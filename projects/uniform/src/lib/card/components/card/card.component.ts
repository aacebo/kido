import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { UNI_HOST_COLORS } from '../../../core/constants';
import { UniColor } from '../../../core/enums';

@Component({
  moduleId: module.id,
  selector: 'uni-card',
  exportAs: 'uniCard',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  host: {
    class: 'uni-card',
    '[class.uni-card-hover]': 'hover',
    ...UNI_HOST_COLORS,
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UniCardComponent {
  @Input() color?: UniColor;
  @Input() hover?: boolean;
}
