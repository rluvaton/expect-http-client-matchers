const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHave5xxStatus(actual) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const status = adapter.getStatusCode();

  const pass = status >= 500 && status <= 599;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHave3xxStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be between 500 and 599 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHave3xxStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be between 500 and 599 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHave5xxStatus };
