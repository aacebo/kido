import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JsonViewerComponent } from './json-viewer.component';

@NgModule({
  declarations: [JsonViewerComponent],
  exports: [JsonViewerComponent],
  imports: [CommonModule],
})
export class JsonViewerModule { }
