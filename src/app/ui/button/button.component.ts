import { Component, ChangeDetectionStrategy, Input, ViewEncapsulation, ElementRef, OnInit } from '@angular/core';

import { Color } from '../../core/enums';

import {
  ButtonTheme,
  ButtonSize,
  getButtonHost,
} from '../core/button';

const BUTTON_HOST_ATTRIBUTES = [
  'kido-button',
  'kido-icon-button',
];

@Component({
  moduleId: module.id,
  exportAs: 'kidoButton',
  selector: 'button[kido-button], button[kido-icon-button]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./button.component.scss'],
  host: {
    class: 'btn',
    ...getButtonHost(),
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent implements OnInit {
  @Input() color = Color.Primary;
  @Input() theme = ButtonTheme.Default;
  @Input() size = ButtonSize.Medium;

  private get _element() {
    return this._el.nativeElement;
  }

  constructor(private readonly _el: ElementRef<HTMLButtonElement>) { }

  ngOnInit() {
    for (const attr of BUTTON_HOST_ATTRIBUTES) {
      if (this._hasHostAttributes(attr)) {
        this._element.classList.add(attr);
      }
    }
  }

  private _hasHostAttributes(...attributes: string[]) {
    return attributes.some(attr => this._element.hasAttribute(attr));
  }
}
