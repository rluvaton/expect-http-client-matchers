const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHave3xxStatus(actual) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const status = adapter.getStatusCode();

  const pass = status >= 300 && status <= 399;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('.not.toHave3xxStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be between 300 and 399 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHave3xxStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be between 300 and 399 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHave3xxStatus };
