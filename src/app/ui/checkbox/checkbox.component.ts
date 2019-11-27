import { Component, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, ElementRef, Optional, Input } from '@angular/core';
import { NgForm, FormGroupDirective } from '@angular/forms';

import { FormControlBase, formControlProvider } from '../core/form-control';
import { Color } from '../core/enums';

@Component({
  moduleId: module.id,
  exportAs: 'kidoCheckbox',
  selector: 'kido-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  host: { class: 'kido-checkbox' },
  providers: [formControlProvider(CheckboxComponent)],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent extends FormControlBase<boolean> {
  @Input() color = Color.Primary;

  constructor(
    readonly cdr: ChangeDetectorRef,
    readonly el: ElementRef<HTMLElement>,
    @Optional() readonly ngForm: NgForm,
    @Optional() readonly ngFormGroup: FormGroupDirective,
  ) {
    super(el, cdr, ngForm, ngFormGroup);
  }
}
