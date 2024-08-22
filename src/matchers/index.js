const status = require('./status');
const headers = require('./headers');

module.exports = {
  ...status,
  ...headers,
};
