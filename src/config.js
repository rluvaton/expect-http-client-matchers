const { addSupportedAdapters, setDefaultAdapterName } = require('./http-clients');

/**
 *
 * @param {{ customAdapters?: (typeof HttpClientAdapter)[], defaultAdapterName?: string }} options
 */
function configure(options = {}) {
  if (!options) {
    return;
  }

  if (options.customAdapters) {
    addSupportedAdapters(options.customAdapters || []);
  }

  if (options.defaultAdapterName) {
    setDefaultAdapterName(options.defaultAdapterName);
  }
}

module.exports = { configure };
