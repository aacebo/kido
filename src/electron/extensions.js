const electron = require('electron');
const path = require('path');
const os = require('os');
const dev = require('electron-is-dev');

module.exports = function extensions() {
  if (dev && process.env.REDUX_EXTENSION_LOCATION) {
    if (process.env.REDUX_EXTENSION_FORCE_RELOAD) {
      electron.BrowserWindow.removeDevToolsExtension('Redux DevTools');
    }

    electron.BrowserWindow.addDevToolsExtension(
      path.join(os.homedir(), process.env.REDUX_EXTENSION_LOCATION),
    );
  }
}
