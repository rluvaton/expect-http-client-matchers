const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveInsufficientSpaceOnResourceStatus(actual) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const status = adapter.getStatusCode();

  const pass = status === 419;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('.not.toHaveInsufficientSpaceOnResourceStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 419 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveInsufficientSpaceOnResourceStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 419 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveInsufficientSpaceOnResourceStatus };
