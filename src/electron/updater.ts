import { dialog, BrowserWindow, app } from 'electron';
import { autoUpdater } from 'electron-updater';
import * as dev from 'electron-is-dev';
import log from 'electron-log';

log.transports.file.level = dev ? 'debug' : 'info';
autoUpdater.logger = log;

export class KidoUpdater {
  constructor(private _window: BrowserWindow) {
    autoUpdater.setFeedURL({
      provider: 'github',
      repo: 'kido',
      owner: 'aacebo',
      private: true,
      token: process.env.GH_TOKEN,
    });

    autoUpdater.on('update-available', () => {
      autoUpdater.downloadUpdate();
    });

    this.check();
  }

  async check(manual = false) {
    if (process.env.GH_TOKEN) {
      const update = await autoUpdater.checkForUpdates();
      const version =  app.getVersion();

      if (manual && update.updateInfo.version === version) {
        dialog.showMessageBox(this._window, {
          message: 'Your Up To Date!',
          detail: 'Thanks for keeping Kido updated.',
        });
      } else if (update.updateInfo.version !== version) {
        dialog.showMessageBox(this._window, {
          message: 'Update Available',
          detail: 'A newer version of Kido is available, would you list to update?',
          buttons: ['Update', 'Cancel'],
        }).then(choice => {
          if (choice.response === 0) {
            autoUpdater.downloadUpdate();
          }
        });
      }
    }
  }
}
