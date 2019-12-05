const { app, Menu, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
const about = require('./about');

module.exports = function menu(mainWindow) {
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
              }, choice => {
                if (choice === 0) {
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
      label: 'View',
      submenu: [
        { label: 'Toggle Developer Tools', click: () => mainWindow.webContents.openDevTools() }
      ],
    },
  ]));
}
