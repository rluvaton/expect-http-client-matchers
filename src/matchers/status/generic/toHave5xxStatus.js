const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

/**
 * this matcher expects axios response to have 5xx status.
 * @param {import('axios').AxiosResponse} expected
 * @returns {{pass: boolean, message: (function(): string)}}
 */
function toHave5xxStatus(expected) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(expected);
  const status = adapter.getStatusCode();

  const pass = status >= 500 && status <= 599;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHave3xxStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be between 500 and 599 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHave3xxStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be between 500 and 599 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHave5xxStatus };
