import { Directive } from '@angular/core';

@Directive({
  exportAs: 'kidoCardFooter',
  selector: 'kido-card-footer',
  host: { class: 'kido-card-footer card-footer' },
})
export class CardFooterDirective { }
