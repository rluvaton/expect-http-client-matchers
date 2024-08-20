const generic = require('./generic');
const specific = require('./specific');

module.exports = {
  ...generic,
  ...specific,
};
