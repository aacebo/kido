import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lib-uniform',
  template: `
    <p>
      uniform works!
    </p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UniformComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
