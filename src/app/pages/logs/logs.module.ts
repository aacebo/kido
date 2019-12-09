import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogModule as LogFeatureModule } from '../../features/log';

import { LogsComponent } from './logs.component';
import { LogsRoutingModule } from './logs-routing.module';

@NgModule({
  declarations: [LogsComponent],
  imports: [
    CommonModule,
    LogsRoutingModule,
    LogFeatureModule,
  ],
})
export class LogsModule { }
