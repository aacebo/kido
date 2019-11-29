import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { ButtonModule } from '../button';
import { BytesToStringModule } from '../bytes-to-string';
import { ElapseTimeModule } from '../elapse-time';

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

    ButtonModule,
    ElapseTimeModule,
    BytesToStringModule,
  ],
})
export class MessengerModule { }
