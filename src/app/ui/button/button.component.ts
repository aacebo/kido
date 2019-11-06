import { Component, ChangeDetectionStrategy, Input, ViewEncapsulation } from '@angular/core';

import { Color } from '../../core/enums';

import {
  ButtonTheme,
  ButtonSize,
  getButtonHost,
} from '../core/button';

@Component({
  moduleId: module.id,
  exportAs: 'kidoButton',
  selector: 'button[kido-button]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./button.component.scss'],
  host: {
    class: 'kido-button btn',
    ...getButtonHost(),
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
  @Input() color = Color.Primary;
  @Input() theme = ButtonTheme.Default;
  @Input() size = ButtonSize.Medium;
}
