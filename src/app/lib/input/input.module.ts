import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputAppendDirective } from './input-append.directive';
import { InputPrependDirective } from './input-prepend.directive';
import { InputComponent } from './input.component';

@NgModule({
  declarations: [InputComponent, InputPrependDirective, InputAppendDirective],
  exports: [InputComponent, InputPrependDirective, InputAppendDirective],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class InputModule { }
