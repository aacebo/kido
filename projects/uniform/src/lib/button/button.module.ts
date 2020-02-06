import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniButtonComponent } from './button.component';

@NgModule({
  declarations: [UniButtonComponent],
  exports: [UniButtonComponent],
  imports: [CommonModule],
})
export class UniButtonModule {}
