import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniInputComponent } from './input.component';

@NgModule({
  declarations: [UniInputComponent],
  exports: [UniInputComponent],
  imports: [CommonModule],
})
export class UniInputModule { }
