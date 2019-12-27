import { dialog, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import dev from 'electron-is-dev';

export function update(mainWindow: BrowserWindow) {
  log.transports.file.level = dev ? 'debug' : 'info';
  autoUpdater.logger = log;

  autoUpdater.setFeedURL({
    provider: 'github',
    repo: 'kido',
    owner: 'aacebo',
    private: true,
    token: process.env.GH_TOKEN,
  });

  autoUpdater.on('update-available', () => {
    dialog.showMessageBox(mainWindow, {
      message: 'Update Available',
      detail: 'A newer version of Kido is available, would you list to update?',
      buttons: ['Update', 'Cancel'],
    }).then(choice => {
      if (choice.response === 0) {
        autoUpdater.downloadUpdate();
      }
    });
  });

  if (process.env.GH_TOKEN) {
    autoUpdater.checkForUpdates();
  }
}
