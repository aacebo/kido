import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ConnectionType } from './connection-type.enum';

@Component({
  selector: 'kido-connection-icon',
  templateUrl: './connection-icon.component.html',
  styleUrls: ['./connection-icon.component.scss'],
  host: {
    class: 'kido-connection-icon',
    '[class.kido-connection-icon--connected]': 'type === ConnectionType.Connected',
    '[class.kido-connection-icon--disconnected]': 'type === ConnectionType.Disconnected',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectionIconComponent {
  @Input() type = ConnectionType.Disconnected;

  readonly ConnectionType = ConnectionType;
}
