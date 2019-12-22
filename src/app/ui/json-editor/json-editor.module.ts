import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { JsonEditorComponent } from './json-editor.component';

@NgModule({
  declarations: [JsonEditorComponent],
  exports: [JsonEditorComponent],
  imports: [CommonModule, NgbTooltipModule],
})
export class JsonEditorModule { }
