import { ErrorHandler as NgErrorHandler, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { LogService, LogType } from '../../../resources/log';

@Injectable()
export class ErrorHandler implements NgErrorHandler {
  constructor(
    private readonly _logService: LogService,
    private readonly _toastrService: ToastrService,
  ) { }

  handleError(err: Error) {
    this._logService.add(err, LogType.Error);
    this._toastrService.error(err.message);
  }
}
