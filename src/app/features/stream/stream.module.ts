import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModalModule, NgbTooltipModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

import { SocketIconModule } from '../socket-icon';

import { DropdownModule } from '../../ui/dropdown';
import { ButtonModule } from '../../ui/button';
import { InputModule } from '../../ui/input';
import { SelectModule } from '../../ui/select';
import { JsonEditorModule } from '../../ui/json-editor';
import { JsonViewerModule } from '../../ui/json-viewer';

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

    SocketIconModule,

    NgbModalModule,
    NgbTooltipModule,
    NgbTabsetModule,

    DropdownModule,
    ButtonModule,
    InputModule,
    SelectModule,
    JsonEditorModule,
    JsonViewerModule,
  ],
})
export class StreamModule { }
