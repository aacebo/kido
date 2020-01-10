import { Directive } from '@angular/core';

@Directive({
  exportAs: 'kidoCardTitle',
  selector: 'kido-card-title',
  host: { class: 'kido-card-title card-title' },
})
export class CardTitleDirective { }
