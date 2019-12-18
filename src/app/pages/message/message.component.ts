import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { MessageService } from '../../resources/message';
import { StreamService } from '../../resources/stream';
import { SystemService } from '../../resources/system';

@Component({
  selector: 'kido-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent implements OnInit {
  constructor(
    readonly systemService: SystemService,
    readonly messageService: MessageService,
    private readonly _streamService: StreamService,
    private readonly _toastr: ToastrService,
  ) { }

  ngOnInit() {
    document.title = 'Kido - Message';
    this._streamService.get();
  }

  onPropertyValueClicked(e: string) {
    window.navigator.clipboard.writeText(e);
    this._toastr.info('Copied to Clipboard!');
  }
}
