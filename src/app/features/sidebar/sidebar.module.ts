import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ResizeModule } from '../resize';
import { StreamModule } from '../stream';
import { SidebarComponent } from './sidebar.component';

@NgModule({
  declarations: [SidebarComponent],
  exports: [SidebarComponent],
  imports: [CommonModule, RouterModule, ResizeModule, StreamModule],
})
export class SidebarModule { }
