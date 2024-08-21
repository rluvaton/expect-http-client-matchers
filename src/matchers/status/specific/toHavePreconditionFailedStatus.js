const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHavePreconditionFailedStatus(actual) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const status = adapter.getStatusCode();

  const pass = status === 412;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHavePreconditionFailedStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 412 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHavePreconditionFailedStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 412 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHavePreconditionFailedStatus };
