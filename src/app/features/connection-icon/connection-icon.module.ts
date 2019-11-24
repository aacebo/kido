import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectionIconComponent } from './connection-icon.component';

@NgModule({
  declarations: [ConnectionIconComponent],
  exports: [ConnectionIconComponent],
  imports: [CommonModule],
})
export class ConnectionIconModule { }
