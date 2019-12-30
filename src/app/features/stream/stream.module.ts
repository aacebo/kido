import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { ConnectionIconModule } from '../connection-icon';
import { SocketIconModule } from '../socket-icon';

import { ButtonModule } from '../../lib/button';
import { CheckboxModule } from '../../lib/checkbox';
import { DropdownModule } from '../../lib/dropdown';
import { ElapseTimeModule } from '../../lib/elapse-time';
import { InputModule } from '../../lib/input';
import { JsonEditorModule } from '../../lib/json-editor';
import { JsonViewerModule } from '../../lib/json-viewer';
import { MessengerModule } from '../../lib/messenger';
import { SelectModule } from '../../lib/select';
import { SplitModule } from '../../lib/split';

import * as components from './components';

const declarations = [
  components.StreamDetailComponent,
  components.StreamModalComponent,
  components.StreamDetailHeaderComponent,
  components.StreamDetailSidebarComponent,
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
    SplitModule,
  ],
})
export class StreamModule { }
