import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { MessengerComponent } from './messenger.component';
import { MessageComponent } from './message.component';

const declarations = [
  MessengerComponent,
  MessageComponent,
];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule, ScrollingModule],
})
export class MessengerModule { }
