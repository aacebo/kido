import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniToolbarComponent } from './toolbar.component';

@NgModule({
  declarations: [UniToolbarComponent],
  exports: [UniToolbarComponent],
  imports: [CommonModule],
})
export class UniToolbarModule {}
