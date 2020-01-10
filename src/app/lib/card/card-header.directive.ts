import { Directive } from '@angular/core';

@Directive({
  exportAs: 'kidoCardHeader',
  selector: 'kido-card-header',
  host: { class: 'kido-card-header card-header' },
})
export class CardHeaderDirective { }
