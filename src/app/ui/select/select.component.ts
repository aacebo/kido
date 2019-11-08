import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Optional,
  ElementRef,
  ContentChildren,
  QueryList,
  AfterContentInit,
} from '@angular/core';
import { NgForm, FormGroupDirective } from '@angular/forms';

import { FormControlBase, formControlProvider } from '../core/form-control';
import { OptionComponent } from './option.component';

@Component({
  moduleId: module.id,
  exportAs: 'kidoSelect',
  selector: 'kido-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  host: { class: 'kido-select' },
  providers: [formControlProvider(SelectComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SelectComponent extends FormControlBase<string | number> implements AfterContentInit {
  @ContentChildren(OptionComponent) options: QueryList<OptionComponent>;

  get selected() {
    const option = this.options.find(o => o.value === this.value);
    return option ? option.element.innerText : undefined;
  }

  constructor(
    readonly el: ElementRef<HTMLSelectElement>,
    @Optional() readonly ngForm: NgForm,
    @Optional() readonly ngFormGroup: FormGroupDirective,
  ) {
    super(el, ngForm, ngFormGroup);
  }

  ngAfterContentInit() {
    for (const option of this.options.toArray()) {
      option.element.onclick = () => {
        this.value = option.value;
      };
    }
  }
}
