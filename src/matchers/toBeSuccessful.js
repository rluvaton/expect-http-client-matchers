const { printDebugInfo } = require('../utils/get-debug-info');
const { getMatchingAdapter } = require('../http-clients');

function toBeSuccessful(expected) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(expected);
  const status = adapter.getStatusCode();

  const pass = status >= 200 && status <= 299;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toBeSuccessful', 'received', '') +
          '\n\n' +
          'Expected status code to not be successful received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toBeSuccessful', 'received', '') +
          '\n\n' +
          'Expected status code to be successful received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toBeSuccessful };
