import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { PipesModule } from '../core/pipes';
import { MessengerComponent } from './messenger.component';
import { MessageComponent } from './message.component';

const declarations = [
  MessengerComponent,
  MessageComponent,
];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule, PipesModule, ScrollingModule],
})
export class MessengerModule { }
