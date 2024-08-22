const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveUnprocessableEntityStatus(actual) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const status = adapter.getStatusCode();

  const pass = status === 422;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('.not.toHaveUnprocessableEntityStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 422 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveUnprocessableEntityStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 422 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveUnprocessableEntityStatus };
