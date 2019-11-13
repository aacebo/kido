import { HotkeysService } from './hotkeys.service';

export function Hotkeys(keys: string) {
  const hotkeys = HotkeysService.instance;

  return (target: any, name: string) => {
    const ngOnInit = target.ngOnInit;
    const ngOnDestroy = target.ngOnDestroy;

    target.ngOnInit = function() {
      if (ngOnInit) {
        ngOnInit.bind(this)();
      }

      hotkeys.register(keys, target[name].bind(this));
    };

    target.ngOnDestroy = function() {
      if (ngOnDestroy) {
        ngOnDestroy.bind(this)();
      }

      hotkeys.deregister(keys);
    };
  };
}
