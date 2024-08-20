const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveMethodNotAllowedStatus(expected) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(expected);
  const status = adapter.getStatusCode();

  const pass = status === 405;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHaveMethodNotAllowedStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 405 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveMethodNotAllowedStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 405 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveMethodNotAllowedStatus };
