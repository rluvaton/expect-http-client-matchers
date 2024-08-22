const { getMatchingAdapter } = require('../../http-clients');
const { printDebugInfo } = require('../../utils/get-debug-info');

/**
 * @this {import('expect').MatcherUtils}
 */
function toHaveHeader(actual, expectedHeaderName, expectedOptionalValue) {
  // Why we don't support asymmetric matchers as the header name?
  //
  // If we supported asymmetric matchers as the header name we will encounter the following scenario:
  //
  // We have the following headers:
  // - MyHeader1: something
  // - MyHeader2: else
  //
  // and the developer will write:
  // ```js
  // expect(response).toHaveHeader(expect.stringContaining('MyHeader'), 'something');
  // ```
  //
  // which will pass as there is a header that contains 'MyHeader' with value 'something'
  //
  // But if the developer writes:
  // ```js
  // expect(response).not.toHaveHeader(expect.stringContaining('MyHeader'), 'something');
  // ```
  //
  // Did the developer wanted to not have a header that have 'MyHeader' in its name and the value 'something'?
  // which will pass as there is 'MyHeader2' with value `else`
  //
  // Or the developer wanted the opposite of `toHaveHeader`?
  // which will pass as there is 'MyHeader1' with value `something`
  // and they did not want ANY header that contains 'MyHeader' and has value 'something'
  if (typeof expectedHeaderName !== 'string') {
    throw new Error('toHaveHeader expects a string as the expected header name');
  }

  const { matcherHint, printExpected, stringify } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const headers = adapter.getHeaders();

  // Headers are case-insensitive
  let lowerCaseHeaderName = expectedHeaderName.toLowerCase();
  let foundHeader = Object.entries(headers).find(([name]) => name.toLowerCase() === lowerCaseHeaderName);

  const foundHeaderByName = foundHeader;

  if (foundHeader && expectedOptionalValue !== undefined && !this.equals(foundHeader[1], expectedOptionalValue)) {
    foundHeader = undefined;
  }
  let pass = foundHeader !== undefined;

  return {
    pass,
    message: () => {
      // .not
      if (pass) {
        if (expectedOptionalValue === undefined) {
          return [
            matcherHint('.not.toHaveHeader', 'received', expectedHeaderName),
            '',
            `Expected header ${printExpected(expectedHeaderName)} to not exists`,
            '',
            '',
            printDebugInfo(adapter),
          ].join('\n');
        }

        return [
          matcherHint(
            '.not.toHaveHeader',
            'received',
            stringify(expectedHeaderName) + ', ' + stringify(expectedOptionalValue),
          ),
          '',
          `Expected header ${printExpected(expectedHeaderName)} to not have value ${printExpected(expectedOptionalValue)}`,
          '',
          '',
          printDebugInfo(adapter),
        ].join('\n');
      }

      if (expectedOptionalValue === undefined) {
        return [
          matcherHint('.toHaveHeader', 'received', expectedHeaderName),
          '',
          `Expected header ${printExpected(expectedHeaderName)} to exists`,
          '',
          '',
          printDebugInfo(adapter),
        ].join('\n');
      }

      return buildToHaveHeaderWithExpectedValueErrorMessage({
        adapter,
        matcherUtils: this,
        expectedHeaderName,
        expectedHeaderValue: expectedOptionalValue,
        matchedHeaderByName: foundHeaderByName,
      });
    },
  };
}

/**
 *
 * @param {import('expect').MatcherUtils} matcherUtils
 * @param {HttpClientAdapter} adapter
 * @param {string} expectedHeaderName
 * @param {unknown} expectedHeaderValue
 * @param {[headerName: string, value: string]} matchedHeaderByName
 */
function buildToHaveHeaderWithExpectedValueErrorMessage({
  matcherUtils,
  adapter,
  expectedHeaderName,
  expectedHeaderValue,
  matchedHeaderByName,
}) {
  const { matcherHint, printReceived, printExpected, stringify } = matcherUtils.utils;

  // If no header found
  if (!matchedHeaderByName) {
    return [
      matcherHint('.toHaveHeader', 'received', stringify(expectedHeaderName) + ', ' + stringify(expectedHeaderValue)),
      '',
      `Expected header ${printExpected(expectedHeaderName)} to have value ${printExpected(expectedHeaderValue)}`,
      'But no header with that name found',
      '',
      '',
      printDebugInfo(adapter),
    ].join('\n');
  }

  return [
    matcherHint('.toHaveHeader', 'received', stringify(expectedHeaderName) + ', ' + stringify(expectedHeaderValue)),
    '',
    `Expected header ${printExpected(expectedHeaderName)} to have value ${printExpected(expectedHeaderValue)}`,
    'But instead received: ' + printReceived(matchedHeaderByName[1]),
    '',
    '',
    printDebugInfo(adapter),
  ].join('\n');
}

module.exports = { toHaveHeader };
