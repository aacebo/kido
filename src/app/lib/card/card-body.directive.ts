import { Directive } from '@angular/core';

@Directive({
  exportAs: 'kidoCardBody',
  selector: 'kido-card-body',
  host: { class: 'kido-card-body' },
})
export class CardBodyDirective { }
