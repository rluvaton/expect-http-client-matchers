const { setDefaultAdapter } = require('./http-clients/defaults');

/**
 *
 * @param {{defaultAdapter?: typeof HttpClientAdapter}} options
 */
function configure(options = {}) {
  if (!options) {
    return;
  }

  if (options.defaultAdapter) {
    setDefaultAdapter(options.defaultAdapter);
  }
}

module.exports = { configure };
