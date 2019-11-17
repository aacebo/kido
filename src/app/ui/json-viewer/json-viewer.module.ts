import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
