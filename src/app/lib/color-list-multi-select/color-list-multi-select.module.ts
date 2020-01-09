import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CheckboxModule } from '../checkbox';
import { InputModule } from '../input';
import { ButtonModule } from '../button';

import { ColorListMultiSelectComponent } from './color-list-multi-select.component';

@NgModule({
  declarations: [ColorListMultiSelectComponent],
  exports: [ColorListMultiSelectComponent],
  imports: [CommonModule, FormsModule, CheckboxModule, InputModule, ButtonModule],
})
export class ColorListMultiSelectModule { }
