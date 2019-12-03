import { Component, ChangeDetectionStrategy } from '@angular/core';

import { SystemService } from '../../resources/system';

@Component({
  selector: 'kido-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  constructor(readonly systemService: SystemService) { }
}
