import { ErrorHandler as NgErrorHandler, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as util from 'util';

import { ElectronService } from '../../services';

@Injectable()
export class ErrorHandler implements NgErrorHandler {
  constructor(
    private readonly _toastrService: ToastrService,
    private readonly _electronService: ElectronService,
  ) { }

  handleError(err: Error) {
    console.error(err);
    this._electronService.send('ga.exception', util.inspect(err));
    this._toastrService.error(err.message || util.inspect(err));
  }
}
