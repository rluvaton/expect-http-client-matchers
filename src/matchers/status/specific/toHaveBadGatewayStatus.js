const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveBadGatewayStatus(expected) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(expected);
  const status = adapter.getStatusCode();

  const pass = status === 502;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHaveBadGatewayStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 502 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveBadGatewayStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 502 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveBadGatewayStatus };
