const { printAxiosDebugInfo } = require('../utils/axios-debugging-info');

/**
 * this matcher expects axios response to have 5xx status.
 * @param {import('axios').AxiosResponse} expected
 * @returns {{pass: boolean, message: (function(): string)}}
 */
function toHave5xxStatus(expected) {
  const { matcherHint, printReceived } = this.utils;

  const pass = expected.status >= 500 && expected.status <= 599;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toHave3xxStatus', 'received', '') +
          '\n\n' +
          'Expected status code to not be between 500 and 599 received:\n' +
          `  ${printReceived(expected.status)}\n\n` +
          printAxiosDebugInfo(expected)
        : matcherHint('.toHave3xxStatus', 'received', '') +
          '\n\n' +
          'Expected status code to be between 500 and 599 received:\n' +
          `  ${printReceived(expected.status)}\n\n` +
          printAxiosDebugInfo(expected),
  };
}

module.exports = { toHave5xxStatus };
