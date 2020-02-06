import { Directive } from '@angular/core';

import { UniDialogRef } from '../../dialog-ref.class';

@Directive({
  selector: '[uniDialogClose]',
  host: {
    '(click)': 'onClick()',
  },
})
export class UniDialogCloseDirective {
  constructor(private readonly _dialogRef: UniDialogRef) {}

  onClick() {
    this._dialogRef.dismiss();
  }
}
