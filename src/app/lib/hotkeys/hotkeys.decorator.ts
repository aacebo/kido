import { NgZone } from '@angular/core';

import { HotkeysService } from './hotkeys.service';
import { HotkeyBase } from './hotkey.base';

export function Hotkeys(comb: string, description: string) {
  return (target: Partial<HotkeyBase>, name: string) => {
    const ngOnInit = target.ngOnInit;
    const ngOnDestroy = target.ngOnDestroy;
    let cnt = 0;

    target.ngOnInit = function() {
      cnt++;

      if (ngOnInit) {
        ngOnInit.bind(this)();
      }

      if (!HotkeysService.instance.hotkeys[comb]) {
        HotkeysService.instance.register(
          comb,
          description,
          target[name].bind(this),
          new NgZone({ enableLongStackTrace: false }),
          target.constructor.name,
        );
      }
    };

    target.ngOnDestroy = function() {
      cnt--;

      if (ngOnDestroy) {
        ngOnDestroy.bind(this)();
      }

      if (cnt === 0) {
        HotkeysService.instance.deregister(comb);
      }
    };
  };
}
