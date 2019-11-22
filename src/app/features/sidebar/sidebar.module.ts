import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResizeModule } from '../resize';
import { StreamModule } from '../stream';
import { SidebarComponent } from './sidebar.component';

@NgModule({
  declarations: [SidebarComponent],
  exports: [SidebarComponent],
  imports: [CommonModule, ResizeModule, StreamModule],
})
export class SidebarModule { }
