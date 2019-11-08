import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, ElementRef, Optional, ChangeDetectorRef } from '@angular/core';
import { NgForm, FormGroupDirective } from '@angular/forms';
import { coerceNumberProperty } from '@angular/cdk/coercion';

import { FormControlBase, formControlProvider, getFormControlClass } from '../core/form-control';
import { Size } from '../core/enums';

@Component({
  moduleId: module.id,
  exportAs: 'kidoInput',
  selector: 'kido-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  host: {
    class: 'kido-input',
    '[attr.tabindex]': '-1',
  },
  providers: [formControlProvider(InputComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class InputComponent extends FormControlBase<string> {
  @Input() type = 'text';
  @Input() size = Size.Medium;
  @Input()
  get rows() { return this._rows; }
  set rows(v: number) {
    this._rows = coerceNumberProperty(v);
  }
  private _rows = 3;

  @Input()
  get maxLength() { return this._maxLength; }
  set maxLength(v: number) {
    if (v) {
      this._maxLength = coerceNumberProperty(v) || undefined;
    }
  }
  private _maxLength?: number;

  @Input()
  get minLength() { return this._minLength; }
  set minLength(v: number) {
    if (v) {
      this._minLength = coerceNumberProperty(v) || undefined;
    }
  }
  private _minLength?: number;

  get classes() {
    return getFormControlClass(this.size);
  }

  constructor(
    readonly el: ElementRef<HTMLInputElement | HTMLTextAreaElement>,
    readonly cdr: ChangeDetectorRef,
    @Optional() readonly ngForm: NgForm,
    @Optional() readonly ngFormGroup: FormGroupDirective,
  ) {
    super(el, cdr, ngForm, ngFormGroup);
  }
}
