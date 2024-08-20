const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHavePermanentRedirectStatus(expected) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(expected);
  const status = adapter.getStatusCode();

  const pass = status === 308;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHavePermanentRedirectStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 308 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHavePermanentRedirectStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 308 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHavePermanentRedirectStatus };
