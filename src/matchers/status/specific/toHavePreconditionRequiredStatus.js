const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHavePreconditionRequiredStatus(expected) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(expected);
  const status = adapter.getStatusCode();

  const pass = status === 428;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHavePreconditionRequiredStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 428 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHavePreconditionRequiredStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 428 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHavePreconditionRequiredStatus };
