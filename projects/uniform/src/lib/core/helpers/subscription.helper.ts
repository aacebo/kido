import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class UniSubscriptionHelper implements OnDestroy {
  private readonly destroy = new Subject<void>();

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
