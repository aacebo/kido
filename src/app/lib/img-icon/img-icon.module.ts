import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ImgIconComponent } from './img-icon.component';

@NgModule({
  declarations: [ImgIconComponent],
  exports: [ImgIconComponent],
  imports: [CommonModule],
})
export class ImgIconModule { }
