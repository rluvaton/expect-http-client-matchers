const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveResetContentStatus(expected) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(expected);
  const status = adapter.getStatusCode();

  const pass = status === 205;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHaveResetContentStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 205 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveResetContentStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 205 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveResetContentStatus };
