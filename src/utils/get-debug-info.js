const { getMatchingAdapter } = require('../http-clients');

/**
 *
 * @param {HttpClientAdapter} adapter
 */
function getDebuggingInfo(adapter) {
  return {
    url: adapter.getUrl(),
    status: adapter.getStatusCode(),
    headers: adapter.getHeaders(),
    body: adapter.getBody(),
  };
}
/**
 *
 * @param {HttpClientAdapter} adapter
 * @return {string}
 */
function printDebugInfo(adapter) {
  return `response is:\n` + JSON.stringify(getDebuggingInfo(adapter), null, 2);
}

module.exports = {
  printDebugInfo,
};
