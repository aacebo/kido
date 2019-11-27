import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { ButtonModule } from '../button';
import { PipesModule } from '../core/pipes';
import { MessageComponent } from './message.component';
import { MessengerComponent } from './messenger.component';

const declarations = [
  MessengerComponent,
  MessageComponent,
];

@NgModule({
  declarations,
  exports: declarations,
  imports: [
    CommonModule,
    NgbTooltipModule,
    ScrollingModule,

    PipesModule,
    ButtonModule,
  ],
})
export class MessengerModule { }
