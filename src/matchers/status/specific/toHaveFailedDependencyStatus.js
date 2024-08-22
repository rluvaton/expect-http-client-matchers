const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveFailedDependencyStatus(actual) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const status = adapter.getStatusCode();

  const pass = status === 424;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('.not.toHaveFailedDependencyStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 424 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveFailedDependencyStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 424 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveFailedDependencyStatus };
