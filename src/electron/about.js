const window = require('./window');

module.exports = function about(parent) {
  window({
    width: 300,
    height: 220,
    resizable: false,
    fullscreenable: false,
    minimizable: false,
    maximizable: false,
    modal: true,
    parent,
  }, '/about');
}
