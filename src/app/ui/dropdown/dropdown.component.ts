import { Component, ChangeDetectionStrategy, Input, ViewEncapsulation } from '@angular/core';

import { Color } from '../../core/enums';

import {
  ButtonTheme,
  ButtonSize,
  getButtonClass,
} from '../core/button';

import { DropdownPlacement } from './dropdown-placement.enum';

@Component({
  moduleId: module.id,
  exportAs: 'kidoDropdown',
  selector: 'kido-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  host: { class: 'kido-dropdown' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DropdownComponent {
  @Input() color = Color.Primary;
  @Input() theme = ButtonTheme.Default;
  @Input() size = ButtonSize.Medium;
  @Input() placement = [
    DropdownPlacement.BottomLeft,
    DropdownPlacement.BottomRight,
    DropdownPlacement.TopLeft,
    DropdownPlacement.TopRight,
  ];

  get classes() {
    return getButtonClass(
      this.color,
      this.theme,
      this.size,
    );
  }
}
