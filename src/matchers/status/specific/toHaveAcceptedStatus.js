const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveAcceptedStatus(actual) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const status = adapter.getStatusCode();

  const pass = status === 202;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('.not.toHaveAcceptedStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 202 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveAcceptedStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 202 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveAcceptedStatus };
