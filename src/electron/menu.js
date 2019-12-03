const { app, Menu } = require('electron');

module.exports = function menu() {
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    {
      label: 'Menu',
      submenu: [
        { label: 'About' },
        { type: 'separator' },
        { label: 'Exit', click: () => app.quit() },
      ],
    },
  ]));
}
