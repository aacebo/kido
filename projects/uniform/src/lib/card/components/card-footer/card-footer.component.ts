import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'uni-card-footer',
  exportAs: 'uniCardFooter',
  templateUrl: './card-footer.component.html',
  styleUrls: ['./card-footer.component.scss'],
  host: {
    class: 'uni-card-footer',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UniCardFooterComponent {}
