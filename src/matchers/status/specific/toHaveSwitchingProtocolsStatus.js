const { printDebugInfo } = require('../../../utils/get-debug-info');
const { getMatchingAdapter } = require('../../../http-clients');

function toHaveSwitchingProtocolsStatus(expected) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(expected);
  const status = adapter.getStatusCode();

  const pass = status === 101;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHaveSwitchingProtocolsStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be 101 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter)
        : matcherHint('.toHaveSwitchingProtocolsStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be 101 received:\n' +
          `  ${printReceived(status)}\n\n` +
          printDebugInfo(adapter),
  };
}

module.exports = { toHaveSwitchingProtocolsStatus };
