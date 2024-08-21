const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveUnavailableForLegalReasonsStatus(actual) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const status = adapter.getStatusCode();

  const pass = status === 451;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHaveUnavailableForLegalReasonsStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 451 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveUnavailableForLegalReasonsStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 451 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveUnavailableForLegalReasonsStatus };
