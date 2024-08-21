const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveHttpVersionNotSupportedStatus(actual) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const status = adapter.getStatusCode();

  const pass = status === 505;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHaveHttpVersionNotSupportedStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 505 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveHttpVersionNotSupportedStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 505 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveHttpVersionNotSupportedStatus };
