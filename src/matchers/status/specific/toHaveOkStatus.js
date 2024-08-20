const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveOkStatus(expected) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(expected);
  const status = adapter.getStatusCode();

  const pass = status === 200;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHaveOkStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 200 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveOkStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 200 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveOkStatus };
