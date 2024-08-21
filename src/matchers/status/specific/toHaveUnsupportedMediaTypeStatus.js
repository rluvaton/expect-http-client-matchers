const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveUnsupportedMediaTypeStatus(actual) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const status = adapter.getStatusCode();

  const pass = status === 415;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHaveUnsupportedMediaTypeStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 415 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveUnsupportedMediaTypeStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 415 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveUnsupportedMediaTypeStatus };
