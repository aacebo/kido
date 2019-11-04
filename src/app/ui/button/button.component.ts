import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Color } from '../../core/enums';

import { ButtonTheme } from './button-theme.enum';
import { ButtonSize } from './button-size.enum';
import { getButtonHost } from './get-color-host.util';

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
})
export class ButtonComponent {
  @Input() color = Color.Primary;
  @Input() theme = ButtonTheme.Default;
  @Input() size = ButtonSize.Medium;
}
