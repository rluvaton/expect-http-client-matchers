const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveGoneStatus(actual) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const status = adapter.getStatusCode();

  const pass = status === 410;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('.not.toHaveGoneStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 410 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveGoneStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 410 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveGoneStatus };
