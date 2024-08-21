const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveRequestedRangeNotSatisfiableStatus(actual) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const status = adapter.getStatusCode();

  const pass = status === 416;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHaveRequestedRangeNotSatisfiableStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 416 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveRequestedRangeNotSatisfiableStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 416 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveRequestedRangeNotSatisfiableStatus };
