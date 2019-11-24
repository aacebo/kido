import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModalModule, NgbTooltipModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

import { SocketIconModule } from '../socket-icon';
import { ResizeModule } from '../resize';
import { ConnectionIconModule } from '../connection-icon';

import { DropdownModule } from '../../ui/dropdown';
import { ButtonModule } from '../../ui/button';
import { InputModule } from '../../ui/input';
import { SelectModule } from '../../ui/select';
import { JsonEditorModule } from '../../ui/json-editor';
import { JsonViewerModule } from '../../ui/json-viewer';
import { MessengerModule } from '../../ui/messenger';
import { CheckboxModule } from '../../ui/checkbox';

import * as components from './components';

const declarations = [
  components.StreamListItemComponent,
  components.StreamDetailComponent,
  components.AddStreamModalComponent,
];

@NgModule({
  declarations,
  exports: declarations,
  entryComponents: [
    components.AddStreamModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    SocketIconModule,
    ResizeModule,
    ConnectionIconModule,

    NgbModalModule,
    NgbTooltipModule,
    NgbTabsetModule,

    DropdownModule,
    ButtonModule,
    InputModule,
    SelectModule,
    JsonEditorModule,
    JsonViewerModule,
    MessengerModule,
    CheckboxModule,
  ],
})
export class StreamModule { }
