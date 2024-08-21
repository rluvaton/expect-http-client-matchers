const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveStatus(actual, expected) {
  const { matcherHint, printReceived, stringify } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const status = adapter.getStatusCode();

  const pass = this.equals(status, expected);

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('.not.toHaveStatus', 'received', stringify(expected)) +
          '\n\n' +
          `Expected status code to not be ${stringify(expected)} received:` +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveStatus', 'received', stringify(expected)) +
          '\n\n' +
          `Expected status code to be ${stringify(expected)} received:` +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveStatus };
