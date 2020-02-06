import { Input, TemplateRef } from '@angular/core';

import { UniPosition } from './position.enum';

export class UniPositionBase {
  @Input() content: string | TemplateRef<any>;
  @Input() position: UniPosition;

  get isString() {
    return typeof this.content === 'string';
  }
}
