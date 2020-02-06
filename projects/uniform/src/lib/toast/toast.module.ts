import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { UniToastComponent } from './toast.component';
import { UniToastService } from './toast.service';
import { UNI_TOAST_CONFIG, UNI_TOAST_DEFAULT_CONFIG } from './toast-config.constant';
import { IUniToastConfig } from './toast-config.interface';

@NgModule({
  declarations: [UniToastComponent],
  entryComponents: [UniToastComponent],
  imports: [CommonModule, OverlayModule],
  providers: [
    UniToastService,
    {
      provide: UNI_TOAST_CONFIG,
      useValue: UNI_TOAST_DEFAULT_CONFIG,
    },
  ],
})
export class UniToastModule {
  static forRoot(config: IUniToastConfig): ModuleWithProviders<UniToastModule> {
    return {
      ngModule: UniToastModule,
      providers: [{
        provide: UNI_TOAST_CONFIG,
        useValue: config,
      }],
    };
  }
}
