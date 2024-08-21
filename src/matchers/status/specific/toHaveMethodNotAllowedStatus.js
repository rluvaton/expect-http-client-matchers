const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveMethodNotAllowedStatus(actual) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(actual);
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
