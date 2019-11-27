import { NgModule } from '@angular/core';

import { MessageModule } from './message';
import { StreamModule } from './stream';
import { SystemModule } from './system';

@NgModule({
  imports: [
    SystemModule,
    StreamModule,
    MessageModule,
  ],
})
export class ResourcesModule { }
