import { NgModule } from '@angular/core';

import { MessageModule } from './message';
import { StreamModule } from './stream';
import { SystemModule } from './system';
import { RouterModule } from './router';
import { LogModule } from './log';

@NgModule({
  imports: [
    SystemModule,
    StreamModule,
    MessageModule,
    RouterModule,
    LogModule,
  ],
})
export class ResourcesModule { }
