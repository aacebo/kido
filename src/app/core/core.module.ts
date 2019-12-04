import { NgModule, ErrorHandler as NgErrorHandler } from '@angular/core';

import * as middleware from './middleware';

@NgModule({
  providers: [
    { provide: NgErrorHandler, useClass: middleware.ErrorHandler },
  ],
})
export class CoreModule { }
