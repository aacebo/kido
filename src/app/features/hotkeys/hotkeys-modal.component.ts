import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';

import { IHotkey, HotkeysService } from '../../lib/hotkeys';

@Component({
  selector: 'kido-hotkeys-modal',
  templateUrl: './hotkeys-modal.component.html',
  styleUrls: ['./hotkeys-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotkeysModalComponent implements OnInit, OnDestroy {
  hotkeys: IHotkey[] = [];

  ngOnInit() {
    HotkeysService.instance.pauseOthers(this);
    this.hotkeys = HotkeysService.instance.entities;
  }

  ngOnDestroy() {
    HotkeysService.instance.unpauseOthers(this);
  }
}
