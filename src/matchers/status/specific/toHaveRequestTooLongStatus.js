const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveRequestTooLongStatus(actual) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const status = adapter.getStatusCode();

  const pass = status === 413;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('.not.toHaveRequestTooLongStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 413 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveRequestTooLongStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 413 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveRequestTooLongStatus };
