const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveNotAcceptableStatus(expected) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(expected);
  const status = adapter.getStatusCode();

  const pass = status === 406;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHaveNotAcceptableStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 406 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveNotAcceptableStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 406 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveNotAcceptableStatus };
