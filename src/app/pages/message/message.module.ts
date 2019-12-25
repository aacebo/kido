import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JsonViewerModule } from '../../lib/json-viewer';

import { MessageComponent } from './message.component';
import { MessageRoutingModule } from './message-routing.module';

@NgModule({
  declarations: [MessageComponent],
  imports: [
    CommonModule,
    MessageRoutingModule,
    JsonViewerModule,
  ],
})
export class MessageModule { }
