import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ElapseTimePipe } from './elapse-time.pipe';

@NgModule({
  declarations: [ElapseTimePipe],
  exports: [ElapseTimePipe],
  imports: [CommonModule],
})
export class ElapseTimeModule { }
