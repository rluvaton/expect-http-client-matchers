/**
 *
 * @param {import('axios').AxiosResponse} response
 * @return {Object}
 */
function getAxiosDebuggingInfo(response) {
  return {
    url: response.config.url,
    status: response.status,
    headers: response.headers,
    body: response.data,
  };
}
/**
 *
 * @param {import('axios').AxiosResponse} response
 * @return {string}
 */
function printAxiosDebugInfo(response) {
  return `axios response is:\n` + JSON.stringify(getAxiosDebuggingInfo(response), null, 2);
}

module.exports = {
  printAxiosDebugInfo,
};
