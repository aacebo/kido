import { NgModule } from '@angular/core';

import { SystemModule } from './system';
import { StreamModule } from './stream';

@NgModule({
  imports: [
    SystemModule,
    StreamModule,
  ],
})
export class ResourcesModule { }
