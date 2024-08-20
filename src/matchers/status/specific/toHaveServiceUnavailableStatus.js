const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveServiceUnavailableStatus(expected) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(expected);
  const status = adapter.getStatusCode();

  const pass = status === 503;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHaveServiceUnavailableStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 503 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveServiceUnavailableStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 503 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveServiceUnavailableStatus };
