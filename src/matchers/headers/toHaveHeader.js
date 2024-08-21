const { getMatchingAdapter } = require('../../http-clients');
const { getHeadersParsed } = require('../../utils/headers');
const { printDebugInfo } = require('../../utils/get-debug-info');

function toHaveHeader(actual, expectedHeaderName, expectedOptionalValue) {
  const { matcherHint, printReceived } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const headers = adapter.getHeaders();

  const parsed = getHeadersParsed(headers);

  let pass = false;

  const actualValue = parsed.lowerCaseHeaders[expectedHeaderName.toLowerCase()];

  if (expectedOptionalValue === undefined) {
    pass = !!actualValue;
  } else {
    pass = actualValue === expectedOptionalValue;
  }

  return {
    pass,
    message: () => {
      if (pass) {
        // .not

        if (expectedOptionalValue === undefined) {
          return (
            matcherHint('not.toHaveHeader', 'received', '') +
            '\n\n' +
            `Expected header ${expectedHeaderName} to not exists:` +
            `  ${printReceived(actualValue)}\n\n` +
            printDebugInfo(adapter)
          );
        } else {
        }
      }

      return pass
        ? matcherHint('not.toHaveHeader', 'received', '') +
            '\n\n' +
            `Expected header to not be ${expected} received:` +
            `  ${printReceived(status)}\n\n` +
            printDebugInfo(adapter)
        : matcherHint('.toHaveStatus', 'received', '') +
            '\n\n' +
            `Expected status code to be ${expected} received:` +
            `  ${printReceived(status)}\n\n` +
            printDebugInfo(adapter);
    },
  };
}

module.exports = { toHaveHeader };
