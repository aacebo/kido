import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from '../button';
import { FullscreenComponent } from './fullscreen.component';

@NgModule({
  declarations: [FullscreenComponent],
  exports: [FullscreenComponent],
  imports: [CommonModule, ButtonModule],
})
export class FullscreenModule { }
