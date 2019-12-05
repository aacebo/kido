const { dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');
const dev = require('electron-is-dev');

module.exports = function update(mainWindow) {
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
    }, choice => {
      if (choice === 0) {
        autoUpdater.downloadUpdate();
      }
    });
  });

  if (process.env.GH_TOKEN) {
    autoUpdater.checkForUpdates();
  }
}
