import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StreamModule as StreamFeatureModule } from '../../features/stream';

import { StreamComponent } from './stream.component';
import { StreamRoutingModule } from './stream-routing.module';

@NgModule({
  declarations: [StreamComponent],
  imports: [
    CommonModule,
    StreamRoutingModule,
    StreamFeatureModule,
  ],
})
export class StreamModule { }
