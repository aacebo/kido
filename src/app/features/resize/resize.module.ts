import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HorizontalResizeDirective } from './directives';

@NgModule({
  declarations: [HorizontalResizeDirective],
  exports: [HorizontalResizeDirective],
  imports: [CommonModule],
})
export class ResizeModule { }
