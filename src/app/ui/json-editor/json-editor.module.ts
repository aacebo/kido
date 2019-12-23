import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbTooltipModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { JsonEditorComponent } from './json-editor.component';
import { JsonEditorModalComponent } from './json-editor-modal.component';

@NgModule({
  declarations: [JsonEditorComponent, JsonEditorModalComponent],
  exports: [JsonEditorComponent, JsonEditorModalComponent],
  entryComponents: [JsonEditorModalComponent],
  imports: [CommonModule, FormsModule, NgbTooltipModule, NgbModalModule],
})
export class JsonEditorModule { }
