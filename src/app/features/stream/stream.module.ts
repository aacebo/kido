import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { ImgIconModule } from '../../ui/img-icon';
import { DropdownModule } from '../../ui/dropdown';
import { ButtonModule } from '../../ui/button';
import { InputModule } from '../../ui/input';
import { SelectModule } from '../../ui/select';

import * as components from './components';

const declarations = [
  components.StreamListItemComponent,
  components.AddStreamButtonComponent,
  components.AddStreamModalComponent,
  components.StreamDetailComponent,
];

@NgModule({
  declarations,
  exports: declarations,
  entryComponents: [components.AddStreamModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    NgbModalModule,
    ImgIconModule,
    DropdownModule,
    ButtonModule,
    InputModule,
    SelectModule,
  ],
})
export class StreamModule { }
