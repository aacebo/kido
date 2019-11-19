import { NgModule } from '@angular/core';

import { SystemModule } from './system';
import { StreamModule } from './stream';
import { MessageModule } from './message';

@NgModule({
  imports: [
    SystemModule,
    StreamModule,
    MessageModule,
  ],
})
export class ResourcesModule { }
