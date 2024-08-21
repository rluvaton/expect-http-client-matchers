const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveSeeOtherStatus(actual) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const status = adapter.getStatusCode();

  const pass = status === 303;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHaveSeeOtherStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 303 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveSeeOtherStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 303 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveSeeOtherStatus };
