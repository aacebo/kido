import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as faker from 'faker';

import { formControlProvider, FormControlBase } from '../core/form-control';
import { IColorListMultiSelectItem } from './color-list-multi-select-item.interface';

@Component({
  moduleId: module.id,
  exportAs: 'kidoColorListMultiSelect',
  selector: 'kido-color-list-multi-select',
  templateUrl: './color-list-multi-select.component.html',
  styleUrls: ['./color-list-multi-select.component.scss'],
  host: {
    class: 'kido-color-list-multi-select',
  },
  providers: [formControlProvider(ColorListMultiSelectComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ColorListMultiSelectComponent extends FormControlBase<IColorListMultiSelectItem[]> {
  @Input() inputPlaceholder?: string;

  @Input()
  get editable() { return this._editable; }
  set editable(v: boolean) {
    this._editable = coerceBooleanProperty(v);
  }
  private _editable?: boolean;

  get value() { return this._value; }
  set value(v: IColorListMultiSelectItem[]) {
    this._value = v ? v.map(o => ({ ...o })) : v;
    this.cdr.markForCheck();
    this.onChange(this._value);
  }
  protected _value?: IColorListMultiSelectItem[];

  get addable() {
    return this.newItemLabel && !this._exists && !this.disabled;
  }

  private get _exists() {
    return (this.value || []).some(v => v.label === this.newItemLabel);
  }

  newItemLabel: string;
  control?: AbstractControl;

  add() {
    if (!this.addable) {
      return;
    }

    if (!this.value) {
      this.value = [];
    }

    this.value = [
      ...this.value,
      {
        label: this.newItemLabel,
        color: faker.internet.color(),
        checked: true,
      },
    ];

    this.newItemLabel = undefined;
  }

  remove(i: number) {
    this.value.splice(i, 1);
    this.value = [...this.value];
  }

  check(e: boolean, i: number) {
    if (this.value[i].checked !== e) {
      this.value[i] = {
        ...this.value[i],
        checked: e,
      };

      this.value = [...this.value];
    }
  }
}
