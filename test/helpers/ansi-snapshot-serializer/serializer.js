const prettyAnsi = require('pretty-ansi');

module.exports = {
  serialize(text) {
    return prettyAnsi(text);
  },
  test(val) {
    return typeof val === 'string' && val.includes('\u001b');
  },
};
