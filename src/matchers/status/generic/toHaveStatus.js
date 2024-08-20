const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveStatus(actual, expected) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const status = adapter.getStatusCode();

  const pass = status === expected;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHaveStatus', 'received', '') +
          '\n\n' +
          `Expected status code to not be ${expected} received:` +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveStatus', 'received', '') +
          '\n\n' +
          `Expected status code to be ${expected} received:` +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveStatus };
