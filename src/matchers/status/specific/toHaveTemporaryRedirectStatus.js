const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveTemporaryRedirectStatus(expected) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(expected);
  const status = adapter.getStatusCode();

  const pass = status === 307;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHaveTemporaryRedirectStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 307 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveTemporaryRedirectStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 307 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveTemporaryRedirectStatus };
