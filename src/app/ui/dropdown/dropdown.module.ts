import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { DropdownComponent } from './dropdown.component';
import { SplitDropdownComponent } from './split-dropdown.component';
import { DropdownItemDirective } from './dropdown-item.directive';
import { DropdownButtonDirective } from './dropdown-button.directive';

const declarations = [
  DropdownComponent,
  SplitDropdownComponent,
  DropdownItemDirective,
  DropdownButtonDirective,
];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule, NgbDropdownModule],
})
export class DropdownModule { }
