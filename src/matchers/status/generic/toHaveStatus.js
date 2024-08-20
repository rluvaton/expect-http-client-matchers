const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveStatus(expected, actual) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(expected);
  const status = adapter.getStatusCode();

  const pass = status === actual;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHaveStatus', 'received', '') +
          '\n\n' +
          `Expected status code to not be ${actual} received:` +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveStatus', 'received', '') +
          '\n\n' +
          `Expected status code to be ${actual} received:` +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveStatus };
