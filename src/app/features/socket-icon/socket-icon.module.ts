import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocketIconComponent } from './socket-icon.component';

@NgModule({
  declarations: [SocketIconComponent],
  exports: [SocketIconComponent],
  imports: [CommonModule],
})
export class SocketIconModule { }
