import { Directive } from '@angular/core';

@Directive({
  selector: '[kidoInputAppend]',
  host: { class: 'input-group-append' },
})
export class InputAppendDirective { }
