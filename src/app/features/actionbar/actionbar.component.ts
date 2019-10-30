import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'kido-actionbar',
  templateUrl: './actionbar.component.html',
  styleUrls: ['./actionbar.component.scss'],
  host: { class: 'bg-light' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionbarComponent { }
