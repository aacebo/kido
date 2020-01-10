import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from './card.component';
import { CardBodyDirective } from './card-body.directive';
import { CardHeaderDirective } from './card-header.directive';
import { CardTitleDirective } from './card-title.directive';
import { CardFooterDirective } from './card-footer.directive';
import { CardImgDirective } from './card-img.directive';

const declarations = [
  CardComponent,
  CardBodyDirective,
  CardHeaderDirective,
  CardTitleDirective,
  CardFooterDirective,
  CardImgDirective,
];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule],
})
export class CardModule { }
