import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BytesToStringPipe } from './bytes-to-string.pipe';

@NgModule({
  declarations: [BytesToStringPipe],
  exports: [BytesToStringPipe],
  imports: [CommonModule],
})
export class BytesToStringModule { }
