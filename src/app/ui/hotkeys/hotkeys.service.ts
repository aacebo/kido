import { NgZone } from '@angular/core';
import * as mousetrap from 'mousetrap';

import { IHotkey } from './hotkey.interface';

mousetrap.prototype.stopCallback = (..._: any) => {
  return false;
};

export class HotkeysService {
  private static _instance: HotkeysService;
  static get instance() {
    if (!this._instance) {
      this._instance = new HotkeysService();
    }

    return this._instance;
  }

  get hotkeys() { return this._hotkeys; }
  private _hotkeys: { [keys: string]: IHotkey } = { };

  private constructor() { }

  register(keys: string, description: string, cb: () => void, zone: NgZone) {
    this._hotkeys[keys] = {
      keys,
      description,
      cb,
    };

    mousetrap.bind(keys, () => {
      zone.run(() => cb());
    });
  }

  deregister(keys: string) {
    this._hotkeys[keys] = undefined;
    mousetrap.unbind(keys);
  }
}
