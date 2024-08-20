const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveRequestUriTooLongStatus(expected) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(expected);
  const status = adapter.getStatusCode();

  const pass = status === 414;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHaveRequestUriTooLongStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 414 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveRequestUriTooLongStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 414 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveRequestUriTooLongStatus };
