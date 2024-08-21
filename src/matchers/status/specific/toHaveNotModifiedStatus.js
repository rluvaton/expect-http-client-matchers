const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveNotModifiedStatus(actual) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const status = adapter.getStatusCode();

  const pass = status === 304;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHaveNotModifiedStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 304 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveNotModifiedStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 304 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveNotModifiedStatus };
