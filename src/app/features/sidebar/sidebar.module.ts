import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

import { SidebarComponent } from './sidebar.component';
import { ResizeModule } from '../resize';

@NgModule({
  declarations: [SidebarComponent],
  exports: [SidebarComponent],
  imports: [CommonModule, NgbTabsetModule, ResizeModule],
})
export class SidebarModule { }
