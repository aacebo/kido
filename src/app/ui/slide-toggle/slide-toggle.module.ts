import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SlideToggleComponent } from './slide-toggle.component';

@NgModule({
  declarations: [SlideToggleComponent],
  exports: [SlideToggleComponent],
  imports: [CommonModule, FormsModule],
})
export class SlideToggleModule { }
