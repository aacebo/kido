import { NgModule } from '@angular/core';

import { MessageModule } from './message';
import { StreamModule } from './stream';
import { SystemModule } from './system';
import { RouterModule } from './router';
import { LogModule } from './log';
import { UpdateModule } from './update';

@NgModule({
  imports: [
    SystemModule,
    StreamModule,
    MessageModule,
    RouterModule,
    LogModule,
    UpdateModule,
  ],
})
export class ResourcesModule { }
