const { getMatchingAdapter } = require('../../http-clients');
const { printDebugInfo } = require('../../utils/get-debug-info');
const { getJSONBody, isJSONBody } = require('../../utils/json-body');
const { jsonEquals } = require('../../utils/matchings/equals-json-body');
const { jsonSubsetEquality, getJsonObjectSubset } = require('../../utils/matchings/equality-testers');
const { printDiffOrStringify } = require('jest-matcher-utils');

/**
 * @this {import('expect').MatcherUtils}
 */
function toHaveBodyMatchObject(actual, expectedValue) {
  const { matcherHint, printExpected, printReceived } = this.utils;

  if (typeof expectedValue !== 'object' || expectedValue === null) {
    throw new Error('toHaveBodyMatchObject expects non-null object as the expected');
  }

  const adapter = getMatchingAdapter(actual);
  const isJson = isJSONBody(adapter);

  let body = adapter.getBody();

  let pass = false;

  if (isJson) {
    body = getJSONBody(adapter);

    // This implementation taken from the `expect`, the code for the `toMatchObject` matcher
    // https://github.com/jestjs/jest/blob/bd1c6db7c15c23788ca3e09c919138e48dd3b28a/packages/expect/src/matchers.ts#L895C1-L951C5

    // Does not add iterator equality check as it JSON only support array and not custom iterable
    // Custom implementation of equals and subset equality is added
    // as we need to not allow non-json values in the expected object
    // and undefined keys in the expected object mean that the key should not be present in the response body
    pass = jsonEquals(body, expectedValue, (this.customTesters || []).concat([jsonSubsetEquality]));
  }

  return {
    pass,
    message: () => {
      // .not
      if (pass) {
        // If we pass the body must be json

        return [
          matcherHint('.not.toHaveBodyMatchObject', 'received', 'expected'),
          '',
          `Expected request to not have data:`,
          printExpected(expectedValue),
          ...(this.utils.stringify(printExpected) !== this.utils.stringify(body)
            ? ['', `Received: ${printReceived(body)}`]
            : []),
          '',
          printDebugInfo(adapter, { omitBody: true }),
        ].join('\n');
      }

      if (!isJson) {
        return [
          matcherHint('.toHaveBodyMatchObject', 'received', 'expected'),
          '',
          `Expected response to have json body`,
          '',
          printDebugInfo(adapter),
        ].join('\n');
      }

      return [
        matcherHint('.toHaveBodyMatchObject', 'received', 'expected'),
        '',
        printDiffOrStringify(
          expectedValue,
          getJsonObjectSubset(body, expectedValue, this.customTesters || []),
          'Expected value',
          'Received value',
          this.expand !== false,
        ),
        '',
        printDebugInfo(adapter, { omitBody: true }),
      ].join('\n');
    },
  };
}

module.exports = { toHaveBodyMatchObject };
