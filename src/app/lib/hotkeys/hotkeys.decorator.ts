import { NgZone } from '@angular/core';

import { HotkeysService } from './hotkeys.service';
import { HotkeyBase } from './hotkey.base';

export function Hotkeys(comb: string, description: string) {
  return (target: Partial<HotkeyBase>, name: string) => {
    const ngOnInit = target.ngOnInit;
    const ngOnDestroy = target.ngOnDestroy;

    target.ngOnInit = function() {
      if (ngOnInit) {
        ngOnInit.bind(this)();
      }

      HotkeysService.instance.register(
        comb,
        description,
        target[name].bind(this),
        new NgZone({ enableLongStackTrace: false }),
        target.constructor.name,
      );
    };

    target.ngOnDestroy = function() {
      if (ngOnDestroy) {
        ngOnDestroy.bind(this)();
      }

      HotkeysService.instance.deregister(comb);
    };
  };
}
