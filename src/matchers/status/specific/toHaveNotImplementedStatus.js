const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveNotImplementedStatus(actual) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const status = adapter.getStatusCode();

  const pass = status === 501;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('.not.toHaveNotImplementedStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 501 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveNotImplementedStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 501 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveNotImplementedStatus };
