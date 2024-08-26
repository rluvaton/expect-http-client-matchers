const { axiosTestAdapterClient } = require('./axios-adapter');
const { gotTestAdapterClient } = require('./got-adapter.js');

/**
 * @type {TestAdapterClient[]}
 */
const testClients = [axiosTestAdapterClient, gotTestAdapterClient];

module.exports = {
  testClients,
};
