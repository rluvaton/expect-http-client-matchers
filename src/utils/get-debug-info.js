/**
 *
 * @param {HttpClientAdapter} adapter
 * @param {{omitBody?: boolean}} options
 */
function getDebuggingInfo(adapter, options = {}) {
  const info = {
    url: adapter.getUrl(),
    status: adapter.getStatusCode(),
    headers: adapter.getHeaders(),
  };

  if (!options.omitBody) {
    info.body = adapter.getBody();
  }

  return info;
}
/**
 *
 * @param {HttpClientAdapter} adapter
 * @param {{omitBody?: boolean}} options
 * @return {string}
 */
function printDebugInfo(adapter, options = {}) {
  return `------------\nresponse is:\n` + JSON.stringify(getDebuggingInfo(adapter, options), null, 2);
}

module.exports = {
  printDebugInfo,
};
