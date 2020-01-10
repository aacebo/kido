import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from './card.component';
import { CardBodyDirective } from './card-body.directive';
import { CardTitleDirective } from './card-title.directive';

const declarations = [
  CardComponent,
  CardBodyDirective,
  CardTitleDirective,
];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule],
})
export class CardModule { }
