import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { OptionComponent } from './option.component';
import { SelectComponent } from './select.component';

@NgModule({
  declarations: [SelectComponent, OptionComponent],
  exports: [SelectComponent, OptionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
  ],
})
export class SelectModule { }
