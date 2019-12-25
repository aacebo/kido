import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SplitModule } from '../../lib/split';
import { StreamModule } from '../stream';
import { SidebarComponent } from './sidebar.component';

@NgModule({
  declarations: [SidebarComponent],
  exports: [SidebarComponent],
  imports: [CommonModule, SplitModule, StreamModule],
})
export class SidebarModule { }
