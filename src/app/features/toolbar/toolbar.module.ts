import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownModule } from '../../ui/dropdown';
import { ImgIconModule } from '../../ui/img-icon';

import { ToolbarComponent } from './toolbar.component';

@NgModule({
  declarations: [ToolbarComponent],
  exports: [ToolbarComponent],
  imports: [CommonModule, DropdownModule, ImgIconModule],
})
export class ToolbarModule { }
