import { ErrorHandler as NgErrorHandler, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as util from 'util';

import { GoogleAnalyticsService } from '../../services';

@Injectable()
export class ErrorHandler implements NgErrorHandler {
  constructor(
    private readonly _toastrService: ToastrService,
    private readonly _googleAnalyticsService: GoogleAnalyticsService,
  ) { }

  handleError(err: Error) {
    console.error(err);
    this._googleAnalyticsService.exception(util.inspect(err));
    this._toastrService.error(err.message || util.inspect(err));
  }
}
