const { printAxiosDebugInfo } = require('../utils/axios-debugging-info');

/**
 * this matcher expects axios response to have 2xx status.
 * @param {import('axios').AxiosResponse} expected
 * @returns {{pass: boolean, message: (function(): string)}}
 */
function toHave4xxStatus(expected) {
  const { matcherHint, printReceived } = this.utils;

  const pass = expected.status >= 400 && expected.status <= 499;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHave3xxStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be between 400 and 499 received:\n' +
          `  ${printReceived(expected.status)}\n\n` +
          printAxiosDebugInfo(expected)
        : matcherHint('.toHave3xxStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be between 400 and 499 received:\n' +
          `  ${printReceived(expected.status)}\n\n` +
          printAxiosDebugInfo(expected),
  };
}

module.exports = { toHave4xxStatus };
