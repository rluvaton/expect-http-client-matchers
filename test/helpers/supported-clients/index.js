const { axiosTestAdapterClient } = require('./axios-adapter');

/**
 * @type {TestAdapterClient[]}
 */
const testClients = [axiosTestAdapterClient];

module.exports = {
  testClients,
};
