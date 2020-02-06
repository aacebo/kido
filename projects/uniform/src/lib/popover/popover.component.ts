import { Component, ChangeDetectionStrategy } from '@angular/core';

import { UNI_POSITIONS, UniPositionBase } from '../core/position';

@Component({
  moduleId: module.id,
  selector: 'uni-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  host: {
    class: 'uni-popover',
    ...UNI_POSITIONS,
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UniPopoverComponent extends UniPositionBase {}
