import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SlideToggleModule } from '../slide-toggle';
import { JsonViewerComponent } from './json-viewer.component';

@NgModule({
  declarations: [JsonViewerComponent],
  exports: [JsonViewerComponent],
  imports: [CommonModule, FormsModule, SlideToggleModule],
})
export class JsonViewerModule { }
