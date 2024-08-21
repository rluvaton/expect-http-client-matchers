const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveBadRequestStatus(actual) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const status = adapter.getStatusCode();

  const pass = status === 400;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('.not.toHaveBadRequestStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 400 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveBadRequestStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 400 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveBadRequestStatus };
