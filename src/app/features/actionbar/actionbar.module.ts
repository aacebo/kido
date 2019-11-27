import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ActionbarComponent } from './actionbar.component';

@NgModule({
  declarations: [ActionbarComponent],
  exports: [ActionbarComponent],
  imports: [CommonModule],
})
export class ActionbarModule { }
