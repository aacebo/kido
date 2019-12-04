const { dialog, app } = require('electron');
const dev = require('electron-is-dev');

module.exports = function about(parent) {
  dialog.showMessageBox(parent, {
    message: 'About Kido',
    detail: `${app.getVersion()} (${dev ? 'development' : 'production'})`,
  });
}
