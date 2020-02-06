import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { UniProgressMode } from '../../enums/progress-mode.enum';
import { UniColor } from '../../../core/enums';
import { uniColors } from '../../../core/constants';

@Component({
  moduleId: module.id,
  selector: 'uni-progress-bar',
  exportAs: 'uniProgresssBar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  host: {
    class: 'uni-progress-bar',
    '[class.indeterminate]': 'mode === "indeterminate"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UniProgressBarComponent {
  @Input() mode = UniProgressMode.Indeterminate;
  @Input() color = UniColor.Primary;
  @Input() total = 100;
  @Input() value = 0;

  get colors() {
    return uniColors(this.color);
  }

  get percentage() {
    return (100 / this.total) * this.value;
  }
}
