const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveInsufficientStorageStatus(actual) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const status = adapter.getStatusCode();

  const pass = status === 507;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHaveInsufficientStorageStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 507 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveInsufficientStorageStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 507 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveInsufficientStorageStatus };
