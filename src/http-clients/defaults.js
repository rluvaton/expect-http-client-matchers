/**
 *
 * @type {typeof HttpClientAdapter}
 */
let DefaultAdapter;

function hasDefaultAdapterConfigured() {
  return DefaultAdapter !== undefined;
}

/**
 *
 * @returns {HttpClientAdapter}
 */
function getDefaultAdapter() {
  return DefaultAdapter;
}

/**
 *
 * @param {typeof HttpClientAdapter} adapter
 */
function setDefaultAdapter(adapter) {
  DefaultAdapter = adapter;
}

module.exports = {
  hasDefaultAdapterConfigured,
  getDefaultAdapter,
  setDefaultAdapter,
};
