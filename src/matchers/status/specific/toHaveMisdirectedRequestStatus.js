const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveMisdirectedRequestStatus(expected) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(expected);
  const status = adapter.getStatusCode();

  const pass = status === 421;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHaveMisdirectedRequestStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 421 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveMisdirectedRequestStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 421 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveMisdirectedRequestStatus };
