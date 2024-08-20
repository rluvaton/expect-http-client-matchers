const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveCreatedStatus(expected) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(expected);
  const status = adapter.getStatusCode();

  const pass = status === 201;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHaveCreatedStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 201 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveCreatedStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 201 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveCreatedStatus };
