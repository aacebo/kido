const updater = require('electron-updater');
const log = require('electron-log');
const dev = require('electron-is-dev');

module.exports = async function update(mainWindow) {
  log.transports.file.level = dev ? 'debug' : 'info';
  updater.autoUpdater.logger = log;

  updater.autoUpdater.setFeedURL({
    provider: 'github',
    repo: 'kido',
    owner: 'aacebo',
    private: true,
    token: process.env.GH_TOKEN,
  });

  updater.autoUpdater.on('checking-for-update', () => {
    mainWindow.webContents.send('update--checking-for-update');
  });

  updater.autoUpdater.on('update-available', (...args) => {
    mainWindow.webContents.send('update--update-available', args);
  });

  updater.autoUpdater.on('update-not-available', (...args) => {
    mainWindow.webContents.send('update--update-not-available', args);
  });

  updater.autoUpdater.on('download-progress', (...args) => {
    mainWindow.webContents.send('update--download-progress', args);
  });

  updater.autoUpdater.on('update-downloaded', (...args) => {
    mainWindow.webContents.send('update--update-downloaded', args);
  });

  await updater.autoUpdater.checkForUpdates();
}
