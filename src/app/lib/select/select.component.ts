import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  Optional,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroupDirective, NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { Size } from '../core/enums';
import { FormControlBase, formControlProvider, getFormControlClass } from '../core/form-control';
import { OptionComponent } from './option.component';

@Component({
  moduleId: module.id,
  exportAs: 'kidoSelect',
  selector: 'kido-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  host: {
    class: 'kido-select',
    '[attr.tabindex]': '-1',
  },
  providers: [formControlProvider(SelectComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SelectComponent extends FormControlBase<string | number> implements AfterContentInit {
  @Input() size = Size.Medium;

  @ContentChildren(OptionComponent)
  readonly options: QueryList<OptionComponent>;

  get selected() {
    const option = this.options.find(o => o.value === this.value);
    return option ? this._sanitizer.bypassSecurityTrustHtml(option.element.innerHTML) : undefined;
  }

  get classes() {
    return getFormControlClass(this.size);
  }

  constructor(
    private readonly _sanitizer: DomSanitizer,
    readonly cdr: ChangeDetectorRef,
    readonly el: ElementRef<HTMLSelectElement>,
    @Optional() readonly ngForm: NgForm,
    @Optional() readonly ngFormGroup: FormGroupDirective,
  ) {
    super(el, cdr, ngForm, ngFormGroup);
  }

  ngAfterContentInit() {
    for (const option of this.options.toArray()) {
      option.element.onclick = () => {
        this.value = option.value;
      };
    }

    setTimeout(() => this.cdr.markForCheck());
  }
}
