const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveConflictStatus(expected) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(expected);
  const status = adapter.getStatusCode();

  const pass = status === 409;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHaveConflictStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 409 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveConflictStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 409 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveConflictStatus };
