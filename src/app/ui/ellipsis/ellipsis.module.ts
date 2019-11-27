import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { EllipsisComponent } from './ellipsis.component';

@NgModule({
  declarations: [EllipsisComponent],
  exports: [EllipsisComponent],
  imports: [CommonModule, NgbTooltipModule],
})
export class EllipsisModule { }
