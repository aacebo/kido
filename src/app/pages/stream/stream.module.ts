import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StreamModule as StreamFeatureModule } from '../../features/stream';
import { ToolbarModule } from '../../features/toolbar';
import { SidebarModule } from '../../features/sidebar';
import { ActionbarModule } from '../../features/actionbar';

import { StreamRoutingModule } from './stream-routing.module';
import { StreamComponent } from './stream.component';

@NgModule({
  declarations: [StreamComponent],
  imports: [
    CommonModule,
    StreamRoutingModule,

    StreamFeatureModule,
    ToolbarModule,
    SidebarModule,
    ActionbarModule,
  ],
})
export class StreamModule { }
