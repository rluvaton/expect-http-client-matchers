const { printAxiosDebugInfo } = require('../utils/axios-debugging-info');

/**
 * this matcher expects axios response to have 2xx status.
 * @param {import('axios').AxiosResponse} expected
 * @returns {{pass: boolean, message: (function(): string)}}
 */
function toHave2xxStatus(expected) {
  const { matcherHint, printReceived } = this.utils;

  const pass = expected.status >= 200 && expected.status <= 299;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHave2xxStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be between 200 and 299 received:\n' +
          `  ${printReceived(expected.status)}\n\n` +
          printAxiosDebugInfo(this, expected)
        : matcherHint('.toHave2xxStatus', 'received', '') +
          '\n\n' +
          'Expected value to be between 200 and 299 received:\n' +
          `  ${printReceived(expected.status)}\n\n` +
          printAxiosDebugInfo(this, expected),
  };
}

module.exports = { toHave2xxStatus };
