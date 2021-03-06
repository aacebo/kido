import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { EllipsisModule } from '../ellipsis';
import { JsonViewerComponent } from './json-viewer.component';

@NgModule({
  declarations: [JsonViewerComponent],
  exports: [JsonViewerComponent],
  imports: [
    CommonModule,
    NgbTooltipModule,
    EllipsisModule,
  ],
})
export class JsonViewerModule { }
