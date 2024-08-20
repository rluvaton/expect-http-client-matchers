const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveInternalServerErrorStatus(expected) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(expected);
  const status = adapter.getStatusCode();

  const pass = status === 500;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHaveInternalServerErrorStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 500 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveInternalServerErrorStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 500 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveInternalServerErrorStatus };
