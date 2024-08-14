const { printAxiosDebugInfo } = require('../utils/axios-debugging-info');

/**
 * this matcher expects axios response to be a successful status.
 * @param {import('axios').AxiosResponse} expected
 * @returns {{pass: boolean, message: (function(): string)}}
 */
function toBeSuccessful(expected) {
  const { matcherHint, printReceived } = this.utils;

  const pass = expected.status >= 200 && expected.status <= 299;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toBeSuccessful', 'received', '') +
          '\n\n' +
          'Expected status code to not be successful received:\n' +
          `  ${printReceived(expected.status)}\n\n` +
          printAxiosDebugInfo(expected)
        : matcherHint('.toBeSuccessful', 'received', '') +
          '\n\n' +
          'Expected status code to be successful received:\n' +
          `  ${printReceived(expected.status)}\n\n` +
          printAxiosDebugInfo(expected),
  };
}

module.exports = { toBeSuccessful };
