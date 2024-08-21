const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHavePartialContentStatus(actual) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const status = adapter.getStatusCode();

  const pass = status === 206;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHavePartialContentStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 206 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHavePartialContentStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 206 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHavePartialContentStatus };
