const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHave4xxStatus(actual) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const status = adapter.getStatusCode();

  const pass = status >= 400 && status <= 499;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHave3xxStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be between 400 and 499 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHave3xxStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be between 400 and 499 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHave4xxStatus };
