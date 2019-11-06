import { Directive } from '@angular/core';

@Directive({
  selector: '[kidoDropdownItem]',
  host: { class: 'dropdown-item' },
})
export class DropdownItemDirective { }
