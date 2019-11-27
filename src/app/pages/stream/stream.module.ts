import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StreamModule as StreamFeatureModule } from '../../features/stream';

import { StreamRoutingModule } from './stream-routing.module';
import { StreamComponent } from './stream.component';

@NgModule({
  declarations: [StreamComponent],
  imports: [
    CommonModule,
    StreamRoutingModule,
    StreamFeatureModule,
  ],
})
export class StreamModule { }
