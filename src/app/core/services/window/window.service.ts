
import { Injectable } from '@angular/core';
import * as url from 'url';

import { ElectronService } from '../electron';

@Injectable({
  providedIn: 'root',
})
export class WindowService {
  constructor(private readonly _electronService: ElectronService) { }

  open(page: string, modal = false, onClose?: () => void) {
    const win = new this._electronService.BrowserWindow({
      title: page,
      height: 600,
      width: 800,
      minWidth: 370,
      center: true,
      autoHideMenuBar: true,
      frame: false,
      fullscreenable: false,
      titleBarStyle: 'hiddenInset',
      parent: this._electronService.window,
      modal,
    });

    win.loadURL(
      url.format({
        pathname: `${__dirname}/index.html`,
        protocol: 'file:',
        slashes: true,
      }),
    );

    if (onClose) {
      win.on('close', onClose);
    }

    win.webContents.openDevTools();
  }
}
