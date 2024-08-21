const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveLockedStatus(actual) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const status = adapter.getStatusCode();

  const pass = status === 423;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('.not.toHaveLockedStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 423 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveLockedStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 423 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveLockedStatus };
