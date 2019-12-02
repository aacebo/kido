import { NgModule } from '@angular/core';

import { MessageModule } from './message';
import { StreamModule } from './stream';
import { SystemModule } from './system';
import { RouterModule } from './router';

@NgModule({
  imports: [
    SystemModule,
    StreamModule,
    MessageModule,
    RouterModule,
  ],
})
export class ResourcesModule { }
