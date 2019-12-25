import { Directive } from '@angular/core';

@Directive({
  selector: '[kidoInputPrepend]',
  exportAs: 'kidoInputPrepend',
  host: { class: 'input-group-prepend' },
})
export class InputPrependDirective { }
