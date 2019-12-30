import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

import { StreamModule as StreamFeatureModule } from '../../features/stream';

import { StreamRoutingModule } from './stream-routing.module';
import { StreamComponent } from './stream.component';

@NgModule({
  declarations: [StreamComponent],
  imports: [
    CommonModule,
    NgbTabsetModule,

    StreamRoutingModule,
    StreamFeatureModule,
  ],
})
export class StreamModule { }
