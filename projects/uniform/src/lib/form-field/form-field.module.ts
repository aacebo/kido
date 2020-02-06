import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniFormFieldComponent } from './components/form-field/form-field.component';
import { UniErrorComponent } from './components/error/error.component';
import { UniHintComponent } from './components/hint/hint.component';
import { UniLabelComponent } from './components/label/label.component';

const declarations = [
  UniFormFieldComponent,
  UniErrorComponent,
  UniHintComponent,
  UniLabelComponent,
];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule],
})
export class UniFormFieldModule { }
