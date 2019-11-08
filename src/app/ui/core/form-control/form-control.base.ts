import { Optional, Input, ElementRef } from '@angular/core';
import { NgForm, FormGroupDirective, ControlValueAccessor } from '@angular/forms';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';

let nextId = 0;

export class FormControlBase<T> implements ControlValueAccessor {
  get value() { return this._value; }
  set value(v: T) {
    this._value = v;
    this.onChange(v);
  }
  private _value?: T;

  @Input()
  get id() { return this._id; }
  set id(v: string) {
    this._id = v;
  }
  private _id = `${++nextId}`;

  @Input()
  get tabIndex() { return this._tabIndex; }
  set tabIndex(v: number) {
    this._tabIndex = coerceNumberProperty(v);
    this.el.nativeElement.tabIndex = this._tabIndex;
  }
  private _tabIndex?: number;

  @Input()
  get label() { return this._label; }
  set label(v: string) {
    this._label = v;
  }
  private _label?: string;

  @Input()
  get placeholder() { return this._placeholder; }
  set placeholder(v: string) {
    this._placeholder = v;
  }
  private _placeholder?: string;

  @Input()
  get required() { return this._required; }
  set required(v: boolean) {
    this._required = coerceBooleanProperty(v);
  }
  private _required?: boolean;

  @Input()
  get disabled() { return this._disabled; }
  set disabled(v: boolean) {
    this._disabled = coerceBooleanProperty(v);
  }
  private _disabled?: boolean;

  @Input()
  get readonly() { return this._readonly; }
  set readonly(v: boolean) {
    this._readonly = coerceBooleanProperty(v);
  }
  private _readonly?: boolean;

  onChange: (v: any) => void = () => {};
  onTouch = () => {};

  constructor(
    readonly el: ElementRef<HTMLElement>,
    @Optional() readonly ngForm: NgForm,
    @Optional() readonly ngFormGroup: FormGroupDirective,
  ) {
    this.tabIndex = 0;
  }

  writeValue(value: T) {
    if (value !== this.value) {
      this.value = value;
    }
  }

  registerOnChange(fn: (v: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}) {
    this.onTouch = fn;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
}
