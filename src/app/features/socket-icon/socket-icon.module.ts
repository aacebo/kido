import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SocketIconComponent } from './socket-icon.component';

@NgModule({
  declarations: [SocketIconComponent],
  exports: [SocketIconComponent],
  imports: [CommonModule],
})
export class SocketIconModule { }
