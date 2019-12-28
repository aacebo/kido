import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import * as components from './components';

const declarations = [
  components.SettingsModalComponent,
];

@NgModule({
  declarations,
  exports: declarations,
  entryComponents: [components.SettingsModalComponent],
  imports: [
    CommonModule,
    NgbModalModule,
  ],
})
export class SettingsModule { }
