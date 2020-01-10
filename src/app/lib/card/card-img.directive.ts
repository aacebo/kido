import { Directive } from '@angular/core';

@Directive({
  exportAs: 'kidoCardImg',
  selector: 'kido-card-img',
  host: { class: 'kido-card-img card-img-top' },
})
export class CardImgDirective { }
