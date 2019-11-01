import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from './sidebar.component';
import { ResizeModule } from '../resize';

@NgModule({
  declarations: [SidebarComponent],
  exports: [SidebarComponent],
  imports: [CommonModule, ResizeModule],
})
export class SidebarModule { }
