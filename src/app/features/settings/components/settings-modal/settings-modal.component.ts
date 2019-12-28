import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { SettingsTabs } from '../../enums';

@Component({
  selector: 'kido-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsModalComponent {
  @Input() tab: SettingsTabs;
}
