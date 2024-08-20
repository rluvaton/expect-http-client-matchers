const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveRequestHeaderFieldsTooLargeStatus(expected) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(expected);
  const status = adapter.getStatusCode();

  const pass = status === 431;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHaveRequestHeaderFieldsTooLargeStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 431 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveRequestHeaderFieldsTooLargeStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 431 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveRequestHeaderFieldsTooLargeStatus };
