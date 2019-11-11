import { Component, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, ElementRef, Optional } from '@angular/core';
import { NgForm, FormGroupDirective } from '@angular/forms';

import { FormControlBase, formControlProvider } from '../core/form-control';

@Component({
  moduleId: module.id,
  exportAs: 'kidoSlideToggle',
  selector: 'kido-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.scss'],
  host: { class: 'kido-slide-toggle' },
  providers: [formControlProvider(SlideToggleComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SlideToggleComponent extends FormControlBase<boolean> {
  constructor(
    readonly cdr: ChangeDetectorRef,
    readonly el: ElementRef<HTMLElement>,
    @Optional() readonly ngForm: NgForm,
    @Optional() readonly ngFormGroup: FormGroupDirective,
  ) {
    super(el, cdr, ngForm, ngFormGroup);
  }
}
