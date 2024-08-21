const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveNoContentStatus(actual) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const status = adapter.getStatusCode();

  const pass = status === 204;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('.not.toHaveNoContentStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 204 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveNoContentStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 204 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveNoContentStatus };
