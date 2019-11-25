import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { PipesModule } from '../core/pipes';
import { ButtonModule } from '../button';
import { MessengerComponent } from './messenger.component';
import { MessageComponent } from './message.component';

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
