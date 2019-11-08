import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { SelectComponent } from './select.component';
import { OptionComponent } from './option.component';

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
