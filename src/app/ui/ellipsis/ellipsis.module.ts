import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EllipsisComponent } from './ellipsis.component';

@NgModule({
  declarations: [EllipsisComponent],
  exports: [EllipsisComponent],
  imports: [CommonModule],
})
export class EllipsisModule { }
