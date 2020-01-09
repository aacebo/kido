import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Optional, ViewEncapsulation } from '@angular/core';
import { FormGroupDirective, NgForm } from '@angular/forms';

import { FormControlBase, formControlProvider } from '../core/form-control';

@Component({
  moduleId: module.id,
  exportAs: 'kidoCheckbox',
  selector: 'kido-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  host: {
    class: 'kido-checkbox',
    '[class.disabled]': 'disabled',
  },
  providers: [formControlProvider(CheckboxComponent)],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent extends FormControlBase<boolean> {
  constructor(
    readonly cdr: ChangeDetectorRef,
    readonly el: ElementRef<HTMLElement>,
    @Optional() readonly ngForm: NgForm,
    @Optional() readonly ngFormGroup: FormGroupDirective,
  ) {
    super(el, cdr, ngForm, ngFormGroup);
  }
}
