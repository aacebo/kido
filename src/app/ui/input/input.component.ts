import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, ElementRef, Optional } from '@angular/core';
import { NgForm, FormGroupDirective } from '@angular/forms';
import { coerceNumberProperty } from '@angular/cdk/coercion';

import { FormControlBase, formControlProvider } from '../core/form-control';

@Component({
  moduleId: module.id,
  exportAs: 'kidoInput',
  selector: 'kido-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  host: { class: 'kido-input' },
  providers: [formControlProvider(InputComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class InputComponent extends FormControlBase<string> {
  @Input() type = 'text';
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

  constructor(
    readonly el: ElementRef,
    @Optional() readonly ngForm: NgForm,
    @Optional() readonly ngFormGroup: FormGroupDirective,
  ) {
    super(el, ngForm, ngFormGroup);
  }
}
