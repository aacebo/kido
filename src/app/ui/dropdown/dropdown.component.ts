import { Component, ChangeDetectionStrategy, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

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

  @Input()
  get disabled() { return this._disabled; }
  set disabled(v: boolean) {
    this._disabled = coerceBooleanProperty(v);
  }
  private _disabled?: boolean;

  @Output() clicked = new EventEmitter<void>();
  @Output() openChange = new EventEmitter<boolean>();

  get classes() {
    return getButtonClass(
      this.color,
      this.theme,
      this.size,
    );
  }
}
