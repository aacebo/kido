import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StreamModule } from '../stream';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent],
  imports: [CommonModule, StreamModule],
})
export class ToolbarModule { }
