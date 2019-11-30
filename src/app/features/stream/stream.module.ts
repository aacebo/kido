import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { ConnectionIconModule } from '../connection-icon';
import { ResizeModule } from '../resize';
import { SocketIconModule } from '../socket-icon';

import { ButtonModule } from '../../ui/button';
import { CheckboxModule } from '../../ui/checkbox';
import { DropdownModule } from '../../ui/dropdown';
import { ElapseTimeModule } from '../../ui/elapse-time';
import { InputModule } from '../../ui/input';
import { JsonEditorModule } from '../../ui/json-editor';
import { JsonViewerModule } from '../../ui/json-viewer';
import { MessengerModule } from '../../ui/messenger';
import { SelectModule } from '../../ui/select';

import * as components from './components';

const declarations = [
  components.StreamListItemComponent,
  components.StreamDetailComponent,
  components.StreamModalComponent,
];

@NgModule({
  declarations,
  exports: declarations,
  entryComponents: [
    components.StreamModalComponent,
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
    ElapseTimeModule,
  ],
})
export class StreamModule { }
