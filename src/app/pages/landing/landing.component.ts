import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'kido-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  host: { class: 'kido-landing' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LandingComponent {
}
