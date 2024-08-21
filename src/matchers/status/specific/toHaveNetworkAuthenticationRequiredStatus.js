const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveNetworkAuthenticationRequiredStatus(actual) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const status = adapter.getStatusCode();

  const pass = status === 511;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHaveNetworkAuthenticationRequiredStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 511 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveNetworkAuthenticationRequiredStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 511 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveNetworkAuthenticationRequiredStatus };
