import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EllipsisModule } from '../ellipsis';
import { JsonViewerComponent } from './json-viewer.component';

@NgModule({
  declarations: [JsonViewerComponent],
  exports: [JsonViewerComponent],
  imports: [
    CommonModule,
    EllipsisModule,
  ],
})
export class JsonViewerModule { }
