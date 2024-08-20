const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveUnauthorizedStatus(expected) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(expected);
  const status = adapter.getStatusCode();

  const pass = status === 401;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHaveUnauthorizedStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 401 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveUnauthorizedStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 401 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveUnauthorizedStatus };
