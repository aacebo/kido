const { app, Menu } = require('electron');
const about = require('./about');

module.exports = function menu(mainWindow) {
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    {
      label: 'Menu',
      submenu: [
        { label: 'About', click: () => about(mainWindow) },
        { type: 'separator' },
        { label: 'Exit', click: () => app.quit() },
      ],
    },
  ]));
}
