const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveNotFoundStatus(expected) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(expected);
  const status = adapter.getStatusCode();

  const pass = status === 404;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHaveNotFoundStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 404 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveNotFoundStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 404 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveNotFoundStatus };
