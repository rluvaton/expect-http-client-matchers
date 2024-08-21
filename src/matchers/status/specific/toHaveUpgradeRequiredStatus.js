const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveUpgradeRequiredStatus(actual) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const status = adapter.getStatusCode();

  const pass = status === 426;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHaveUpgradeRequiredStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 426 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveUpgradeRequiredStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 426 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveUpgradeRequiredStatus };
