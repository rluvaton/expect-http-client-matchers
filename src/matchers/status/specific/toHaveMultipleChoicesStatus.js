const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveMultipleChoicesStatus(actual) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const status = adapter.getStatusCode();

  const pass = status === 300;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('.not.toHaveMultipleChoicesStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 300 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveMultipleChoicesStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 300 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveMultipleChoicesStatus };
