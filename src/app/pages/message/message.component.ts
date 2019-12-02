import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { MessageService } from '../../resources/message';

@Component({
  selector: 'kido-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
  constructor(
    readonly messageService: MessageService,
    private readonly _toastr: ToastrService,
  ) { }

  onPropertyValueClicked(e: string) {
    window.navigator.clipboard.writeText(e);
    this._toastr.info('Copied to Clipboard!');
  }
}
