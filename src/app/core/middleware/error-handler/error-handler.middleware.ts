import { ErrorHandler as NgErrorHandler, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as util from 'util';

import { LogService, LogType } from '../../../resources/log';

@Injectable()
export class ErrorHandler implements NgErrorHandler {
  constructor(
    private readonly _logService: LogService,
    private readonly _toastrService: ToastrService,
  ) { }

  handleError(err: Error) {
    console.error(err);
    this._toastrService.error(err.message);

    if (this._logService) {
      this._logService.add(util.inspect(err), 'ErrorHandler', LogType.Error);
    }
  }
}
