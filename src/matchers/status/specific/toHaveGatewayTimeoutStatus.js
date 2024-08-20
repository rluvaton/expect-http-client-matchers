const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveGatewayTimeoutStatus(expected) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(expected);
  const status = adapter.getStatusCode();

  const pass = status === 504;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHaveGatewayTimeoutStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 504 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveGatewayTimeoutStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 504 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveGatewayTimeoutStatus };
