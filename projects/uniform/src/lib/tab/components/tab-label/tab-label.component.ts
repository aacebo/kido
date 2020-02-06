import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { UNI_HOST_COLORS } from '../../../core/constants';
import { UniColor } from '../../../core/enums';

@Component({
  moduleId: module.id,
  selector: 'uni-tab-label',
  exportAs: 'uniTabLabel',
  templateUrl: './tab-label.component.html',
  styleUrls: ['./tab-label.component.scss'],
  host: {
    class: 'uni-tab-label',
    '[class.active]': 'active',
    ...UNI_HOST_COLORS,
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UniTabLabelComponent {
  @Input() active = false;
  @Input() color?: UniColor;
}
