import { Directive } from '@angular/core';

@Directive({
  selector: '[kidoDropdownItem]',
  exportAs: 'kidoDropdownItem',
  host: { class: 'dropdown-item' },
})
export class DropdownItemDirective { }
