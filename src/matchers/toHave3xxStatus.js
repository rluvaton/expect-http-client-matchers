const { printAxiosDebugInfo } = require('../utils/axios-debugging-info');

/**
 * this matcher expects axios response to have 3xx status.
 * @param {import('axios').AxiosResponse} expected
 * @returns {{pass: boolean, message: (function(): string)}}
 */
function toHave3xxStatus(expected) {
  const { matcherHint, printReceived } = this.utils;

  const pass = expected.status >= 300 && expected.status <= 399;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHave3xxStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be between 300 and 399 received:\n' +
          `  ${printReceived(expected.status)}\n\n` +
          printAxiosDebugInfo(expected)
        : matcherHint('.toHave3xxStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be between 300 and 399 received:\n' +
          `  ${printReceived(expected.status)}\n\n` +
          printAxiosDebugInfo(expected),
  };
}

module.exports = { toHave3xxStatus };
