const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveLengthRequiredStatus(actual) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const status = adapter.getStatusCode();

  const pass = status === 411;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('.not.toHaveLengthRequiredStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 411 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveLengthRequiredStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 411 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveLengthRequiredStatus };
