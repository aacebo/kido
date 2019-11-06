import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { DropdownComponent } from './dropdown.component';
import { DropdownItemDirective } from './dropdown-item.directive';
import { DropdownButtonDirective } from './dropdown-button.directive';

@NgModule({
  declarations: [DropdownComponent, DropdownItemDirective, DropdownButtonDirective],
  exports: [DropdownComponent, DropdownItemDirective, DropdownButtonDirective],
  imports: [CommonModule, NgbDropdownModule],
})
export class DropdownModule { }
