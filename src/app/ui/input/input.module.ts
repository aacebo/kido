import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { InputComponent } from './input.component';
import { InputPrependDirective } from './input-prepend.directive';
import { InputAppendDirective } from './input-append.directive';

@NgModule({
  declarations: [InputComponent, InputPrependDirective, InputAppendDirective],
  exports: [InputComponent, InputPrependDirective, InputAppendDirective],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class InputModule { }
