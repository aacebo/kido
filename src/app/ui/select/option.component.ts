import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';

@Component({
  moduleId: module.id,
  exportAs: 'kidoOption',
  selector: 'kido-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  host: { class: 'kido-option dropdown-item' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class OptionComponent {
  @Input() value?: string | number;

  get element() {
    return this._el.nativeElement;
  }

  constructor(private readonly _el: ElementRef<HTMLElement>) { }
}
