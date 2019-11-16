import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EllipsisComponent } from './ellipsis.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [EllipsisComponent],
  exports: [EllipsisComponent],
  imports: [CommonModule, NgbTooltipModule],
})
export class EllipsisModule { }
