const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveMovedPermanentlyStatus(actual) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const status = adapter.getStatusCode();

  const pass = status === 301;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('.not.toHaveMovedPermanentlyStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 301 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveMovedPermanentlyStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 301 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveMovedPermanentlyStatus };
