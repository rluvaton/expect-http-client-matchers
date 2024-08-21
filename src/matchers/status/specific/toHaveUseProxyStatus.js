const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveUseProxyStatus(actual) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const status = adapter.getStatusCode();

  const pass = status === 305;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHaveUseProxyStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 305 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveUseProxyStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 305 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveUseProxyStatus };
