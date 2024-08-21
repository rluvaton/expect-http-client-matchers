const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveMethodFailureStatus(actual) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const status = adapter.getStatusCode();

  const pass = status === 420;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('.not.toHaveMethodFailureStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 420 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveMethodFailureStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 420 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveMethodFailureStatus };
