const {getMatchingAdapter} = require('../../http-clients');
const {printDebugInfo} = require('../../utils/get-debug-info');
const {getJSONBody} = require("../../utils/json-body");
const {jsonEquals} = require("../../utils/matchings/equals-json-body");
const {getObjectSubset, jsonIterableEquality, jsonSubsetEquality} = require("../../utils/matchings/equality-testers");

/**
 * @this {import('expect').MatcherUtils}
 */
function toHaveBodyMatchObject(actual, expectedValue) {
    const {matcherHint, printExpected, printDiffOrStringify, printReceived} = this.utils;

    if (typeof expectedValue !== 'object' || expectedValue === null) {
        throw new Error('toHaveBodyMatchObject expects non-null object as the expected');
    }

    const adapter = getMatchingAdapter(actual);
    const headers = adapter.getHeaders();

    // Headers are case-insensitive
    const contentTypeHeaderValue = Object.entries(headers).find(([name]) => name.toLowerCase() === 'content-type')?.[1];
    const isJson = contentTypeHeaderValue?.toLowerCase().includes('application/json');

    let body = adapter.getBody();

    let pass = false;

    if (isJson) {
        body = getJSONBody(adapter);

        // We have a limitation that if expected value has some property with value `undefined`
        // we can't match it with the actual value because `undefined` is not a valid JSON value

        // This implementation taken from the `expect`, the code for the `toMatchObject` matcher
        // https://github.com/jestjs/jest/blob/bd1c6db7c15c23788ca3e09c919138e48dd3b28a/packages/expect/src/matchers.ts#L895C1-L951C5
        pass = jsonEquals(body, expectedValue, [
            ...this.customTesters,
            jsonIterableEquality,
            jsonSubsetEquality,
        ]);
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
                    ...(this.utils.stringify(printExpected) !== this.utils.stringify(body) ? [
                        '',
                        `Received: ${printReceived(body)}`,
                    ] : []),
                    '',
                    printDebugInfo(adapter, {omitBody: true}),
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
                    getObjectSubset(this, jsonEquals, body, expectedValue, this.customTesters),
                    'Expected value',
                    'Received value',
                    this.expand !== false,
                ),
                '',
                printDebugInfo(adapter, {omitBody: true}),
            ].join('\n');
        },
    };
}

module.exports = {toHaveBodyMatchObject};
