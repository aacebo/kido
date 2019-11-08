import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { InputComponent } from './input.component';
import { InputPrependDirective } from './input-prepend.directive';

@NgModule({
  declarations: [InputComponent, InputPrependDirective],
  exports: [InputComponent, InputPrependDirective],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class InputModule { }
