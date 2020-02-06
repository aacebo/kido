import { Component, ChangeDetectionStrategy } from '@angular/core';

import { UniFormFieldControlBase } from '../form-field';

@Component({
  moduleId: module.id,
  // tslint:disable-next-line: component-selector
  selector: 'input[uniInput], textarea[uniInput]',
  exportAs: 'uniInput',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  host: {
    class: 'uni-input',
    '(input)': 'onInput()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UniInputComponent extends UniFormFieldControlBase<string> {
  get value() { return this._element.value; }
  set value(v: string) {
    this._element.value = v;
    this.onChange(v);
  }

  get textarea() {
    return this._element.nodeName.toLowerCase() === 'textarea';
  }

  private get _element(): HTMLInputElement | HTMLTextAreaElement {
    return this.el.nativeElement;
  }

  onInput() {}
}
