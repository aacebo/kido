import { Directive } from '@angular/core';

@Directive({
  exportAs: 'kidoCardTitle',
  selector: 'kido-card-title',
  host: { class: 'kido-card-title' },
})
export class CardTitleDirective { }
