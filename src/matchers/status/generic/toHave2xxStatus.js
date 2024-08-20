const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

/**
 * this matcher expects axios response to have 2xx status.
 * @param {import('axios').AxiosResponse} expected
 * @returns {{pass: boolean, message: (function(): string)}}
 */
function toHave2xxStatus(expected) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(expected);
  const status = adapter.getStatusCode();

  const pass = status >= 200 && status <= 299;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHave2xxStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be between 200 and 299 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHave2xxStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be between 200 and 299 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHave2xxStatus };
