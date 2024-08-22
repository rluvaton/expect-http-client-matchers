const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveProxyAuthenticationRequiredStatus(actual) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const status = adapter.getStatusCode();

  const pass = status === 407;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('.not.toHaveProxyAuthenticationRequiredStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 407 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveProxyAuthenticationRequiredStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 407 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveProxyAuthenticationRequiredStatus };
