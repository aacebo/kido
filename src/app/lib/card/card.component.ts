import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  moduleId: module.id,
  exportAs: 'kidoCard',
  selector: 'kido-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  host: {
    class: 'kido-card card',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent { }
