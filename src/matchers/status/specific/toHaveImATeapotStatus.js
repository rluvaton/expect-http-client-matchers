const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveImATeapotStatus(expected) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(expected);
  const status = adapter.getStatusCode();

  const pass = status === 418;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHaveImATeapotStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 418 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveImATeapotStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 418 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveImATeapotStatus };
