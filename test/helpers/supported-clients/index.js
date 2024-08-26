const { axiosTestAdapterClient } = require('./axios-adapter');
const {gotTestAdapterClient} = require("./got-adapter.mjs");

/**
 * @type {TestAdapterClient[]}
 */
const testClients = [axiosTestAdapterClient, gotTestAdapterClient];

module.exports = {
  testClients,
};
