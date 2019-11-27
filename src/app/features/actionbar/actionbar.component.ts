import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'kido-actionbar',
  templateUrl: './actionbar.component.html',
  styleUrls: ['./actionbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionbarComponent { }
