import { app, Menu, BrowserWindow } from 'electron';
import { Subject } from 'rxjs';

import { about } from './about';

export class KidoMenu {
  readonly checkForUpdate = new Subject<void>();

  constructor(private _window: BrowserWindow) {
    Menu.setApplicationMenu(Menu.buildFromTemplate([
      {
        label: 'File',
        submenu: [
          { label: 'About Kido', click: () => about(this._window) },
          {
            label: 'Check for Updates...',
            click: () => this.checkForUpdate.next(),
          },
          { type: 'separator' },
          { label: 'Exit', click: () => app.quit() },
        ],
      },
      {
        label: 'Edit',
        submenu: [
          { label: 'Undo', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
          { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', role: 'redo' },
          { type: 'separator' },
          { label: 'Cut', accelerator: 'CmdOrCtrl+X', role: 'cut' },
          { label: 'Copy', accelerator: 'CmdOrCtrl+C', role: 'copy' },
          { label: 'Paste', accelerator: 'CmdOrCtrl+V', role: 'paste' },
          { label: 'Select All', accelerator: 'CmdOrCtrl+A', role: 'selectAll' },
        ],
      },
      {
        label: 'View',
        submenu: [
          { label: 'Toggle Developer Tools', click: () => this._window.webContents.openDevTools() },
        ],
      },
    ]));
  }
}
