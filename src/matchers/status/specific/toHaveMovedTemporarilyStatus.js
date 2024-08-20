const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveMovedTemporarilyStatus(expected) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(expected);
  const status = adapter.getStatusCode();

  const pass = status === 302;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHaveMovedTemporarilyStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 302 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveMovedTemporarilyStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 302 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveMovedTemporarilyStatus };
