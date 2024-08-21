const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveNonAuthoritativeInformationStatus(actual) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const status = adapter.getStatusCode();

  const pass = status === 203;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHaveNonAuthoritativeInformationStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 203 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveNonAuthoritativeInformationStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 203 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveNonAuthoritativeInformationStatus };
