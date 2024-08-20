const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveRequestTimeoutStatus(expected) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(expected);
  const status = adapter.getStatusCode();

  const pass = status === 408;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHaveRequestTimeoutStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 408 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveRequestTimeoutStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 408 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveRequestTimeoutStatus };
