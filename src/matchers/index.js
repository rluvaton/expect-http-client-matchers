const status = require('./status');
const headers = require('./headers');
const data = require('./data');

module.exports = {
  ...status,
  ...headers,
  ...data,
};
