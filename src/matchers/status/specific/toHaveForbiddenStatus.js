const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveForbiddenStatus(expected) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(expected);
  const status = adapter.getStatusCode();

  const pass = status === 403;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHaveForbiddenStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 403 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveForbiddenStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 403 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveForbiddenStatus };
