const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveTooManyRequestsStatus(expected) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(expected);
  const status = adapter.getStatusCode();

  const pass = status === 429;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHaveTooManyRequestsStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 429 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveTooManyRequestsStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 429 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveTooManyRequestsStatus };
