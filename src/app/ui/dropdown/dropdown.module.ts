import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { DropdownButtonDirective } from './dropdown-button.directive';
import { DropdownItemDirective } from './dropdown-item.directive';
import { DropdownComponent } from './dropdown.component';
import { SplitDropdownComponent } from './split-dropdown.component';

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
