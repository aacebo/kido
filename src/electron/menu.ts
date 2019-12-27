import { app, Menu, dialog, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';

import { about } from './about';

export function menu(mainWindow: BrowserWindow) {
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        { label: 'About Kido', click: () => about(mainWindow) },
        {
          label: 'Check for Updates...',
          click: async () => {
            const update = await autoUpdater.checkForUpdates();

            if (update.updateInfo.version === app.getVersion()) {
              dialog.showMessageBox(mainWindow, {
                message: 'Your Up To Date!',
                detail: 'Thanks for keeping Kido updated.',
              });
            } else {
              dialog.showMessageBox(mainWindow, {
                message: 'Update Available',
                detail: 'A newer version of Kido is available, would you list to update?',
                buttons: ['Update', 'Cancel'],
              }).then(choice => {
                if (choice.response === 0) {
                  autoUpdater.downloadUpdate();
                }
              });
            }
          },
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
        { label: 'Toggle Developer Tools', click: () => mainWindow.webContents.openDevTools() },
      ],
    },
  ]));
}
