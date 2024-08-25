const { printDebugInfo } = require('../../utils/get-debug-info');
const { getJSONBody } = require('../../utils/json-body');
const {getMatchingAdapter} = require("../../http-clients");

/**
 * @this {import('expect').MatcherUtils}
 */
function toHaveBodyEquals(actual, expectedValue) {
  const { matcherHint, printExpected, printDiffOrStringify, printReceived } = this.utils;

  const adapter = getMatchingAdapter(actual);
  const headers = adapter.getHeaders();

  // Headers are case-insensitive
  const contentTypeHeaderValue = Object.entries(headers).find(([name]) => name.toLowerCase() === 'content-type')?.[1];
  const isJson = contentTypeHeaderValue?.toLowerCase().includes('application/json');

  let body = adapter.getBody();

  let pass = false;
  if (isJson) {
    body = getJSONBody(adapter);
  }

  pass = this.equals(body, expectedValue);

  return {
    pass,
    message: () => {
      // .not
      if (pass) {
        return [
          matcherHint('.not.toHaveDataEqualsTo', 'received', 'expected'),
          '',
          `Expected request to not have data:`,
          printExpected(expectedValue),
          `But received:`,
          printReceived(body),
          '',
          printDebugInfo(adapter, { omitBody: true }),
        ].join('\n');
      }

      return [
        matcherHint('.toHaveDataEqualsTo', 'received', 'expected'),
        '',
        `Expected request to have data:`,
        printDiffOrStringify(expectedValue, body, 'Expected', 'Received', true),
        '',
        printDebugInfo(adapter, { omitBody: true }),
      ].join('\n');
    },
  };
}

module.exports = { toHaveBodyEquals };
