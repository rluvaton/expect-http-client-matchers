// Taken from `expect-utils` package
// From https://github.com/jestjs/jest/blob/bd1c6db7c15c23788ca3e09c919138e48dd3b28a/packages/expect-utils/src/utils.ts


const {jsonEquals} = require("./equals-json-body");

function isObject(a) {
    return a !== null && typeof a === 'object';
}


/**
 * Retrieves an object's keys for evaluation by getObjectSubset.  This evaluates
 * the prototype chain for string keys but not for non-enumerable symbols.
 * (Otherwise, it could find values such as a Set or Map's Symbol.toStringTag,
 * with unexpected results.)
 *
 *
 * Taken from @jest/expect-utils
 * https://github.com/jestjs/jest/blob/bd1c6db7c15c23788ca3e09c919138e48dd3b28a/packages/expect-utils/src/utils.ts#L46-L57
 */
function getObjectKeys(object) {
    return [
        ...Object.keys(object),
        ...Object.getOwnPropertySymbols(object).filter(
            s => Object.getOwnPropertyDescriptor(object, s)?.enumerable,
        ),
    ];
}


/**
 * Checks if `hasOwnProperty(object, key)` up the prototype chain, stopping at `Object.prototype`.
 *
 * Taken from @jest/expect-utils
 * https://github.com/jestjs/jest/blob/bd1c6db7c15c23788ca3e09c919138e48dd3b28a/packages/expect-utils/src/utils.ts#L28C1-L45C1
 */
function hasPropertyInObject(object, key) {
    const shouldTerminate =
        !object || typeof object !== 'object' || object === Object.prototype;

    if (shouldTerminate) {
        return false;
    }

    return (
        Object.prototype.hasOwnProperty.call(object, key) ||
        hasPropertyInObject(Object.getPrototypeOf(object), key)
    );
}


/**
 * Taken from @jest/expect-utils
 * https://github.com/jestjs/jest/blob/bd1c6db7c15c23788ca3e09c919138e48dd3b28a/packages/expect-utils/src/utils.ts#L112C1-L165C3
 *
 * Strip properties from object that are not present in the subset. Useful for
 * printing the diff for toMatchObject() without adding unrelated noise.
 *
 * @param {import('expect').MatcherUtils} matcherUtils
 * @param equals
 * @param object
 * @param subset
 * @param customTesters
 * @param seenReferences
 */
function getObjectSubset(matcherUtils,
                         equals = matcherUtils.equals,
                         object,
                         subset,
                         customTesters = [],
                         seenReferences = new WeakMap(),
) {
    /* eslint-enable @typescript-eslint/explicit-module-boundary-types */
    if (Array.isArray(object)) {
        if (Array.isArray(subset) && subset.length === object.length) {
            // The map method returns correct subclass of subset.
            return subset.map((sub, i) =>
                getObjectSubset(object[i], sub, customTesters),
            );
        }
    } else if (object instanceof Date) {
        return object;
    } else if (isObject(object) && isObject(subset)) {
        if (
            equals(object, subset, [
                ...customTesters,
                matcherUtils.utils.iterableEquality,
                matcherUtils.utils.subsetEquality,
            ])
        ) {
            // Avoid unnecessary copy which might return Object instead of subclass.
            return subset;
        }

        const trimmed = {};
        seenReferences.set(object, trimmed);

        for (const key of getObjectKeys(object).filter(key =>
            hasPropertyInObject(subset, key),
        )) {
            trimmed[key] = seenReferences.has(object[key])
                ? seenReferences.get(object[key])
                : getObjectSubset(
                    object[key],
                    subset[key],
                    customTesters,
                    seenReferences,
                );
        }

        if (getObjectKeys(trimmed).length > 0) {
            return trimmed;
        }
    }
    return object;
}


const IteratorSymbol = Symbol.iterator;

const hasIterator = (object) =>
    !!(object != null && object[IteratorSymbol]);

/**
 *
 * @param {any} a
 * @param {any} b
 * @param {import('expect').Tester[]} customTesters
 * @param {any[]} aStack
 * @param {any[]} bStack
 * @returns {undefined|boolean}
 */
function jsonIterableEquality(
    a,
    b,
    customTesters = [],
    aStack = [],
    bStack = [],
) {
    if (
        typeof a !== 'object' ||
        typeof b !== 'object' ||
        Array.isArray(a) ||
        Array.isArray(b) ||
        ArrayBuffer.isView(a) ||
        ArrayBuffer.isView(b) ||
        !hasIterator(a) ||
        !hasIterator(b)
    ) {
        return undefined;
    }
    if (a.constructor !== b.constructor) {
        return false;
    }
    let length = aStack.length;
    while (length--) {
        // Linear search. Performance is inversely proportional to the number of
        // unique nested structures.
        // circular references at same depth are equal
        // circular reference is not equal to non-circular one
        if (aStack[length] === a) {
            return bStack[length] === b;
        }
    }
    aStack.push(a);
    bStack.push(b);

    const iterableEqualityWithStack = (a, b) =>
        iterableEquality(
            a,
            b,
            [...filteredCustomTesters],
            [...aStack],
            [...bStack],
        );

    // Replace any instance of iterableEquality with the new
    // iterableEqualityWithStack so we can do circular detection
    const filteredCustomTesters = [
        ...customTesters.filter(t => t !== iterableEquality),
        iterableEqualityWithStack,
    ];

    if (a.size !== undefined) {
        if (a.size !== b.size) {
            return false;
        } else if (isA < Set < unknown >> ('Set', a) || isImmutableUnorderedSet(a)) {
            let allFound = true;
            for (const aValue of a) {
                if (!b.has(aValue)) {
                    let has = false;
                    for (const bValue of b) {
                        const isEqual = jsonEquals(aValue, bValue, filteredCustomTesters);
                        if (isEqual === true) {
                            has = true;
                        }
                    }

                    if (has === false) {
                        allFound = false;
                        break;
                    }
                }
            }
            // Remove the first value from the stack of traversed values.
            aStack.pop();
            bStack.pop();
            return allFound;
        } else if (
            isA < Map < unknown, unknown >> ('Map', a) ||
            isImmutableUnorderedKeyed(a)
        ) {
            let allFound = true;
            for (const aEntry of a) {
                if (
                    !b.has(aEntry[0]) ||
                    !jsonEquals(aEntry[1], b.get(aEntry[0]), filteredCustomTesters)
                ) {
                    let has = false;
                    for (const bEntry of b) {
                        const matchedKey = jsonEquals(
                            aEntry[0],
                            bEntry[0],
                            filteredCustomTesters,
                        );

                        let matchedValue = false;
                        if (matchedKey === true) {
                            matchedValue = jsonEquals(
                                aEntry[1],
                                bEntry[1],
                                filteredCustomTesters,
                            );
                        }
                        if (matchedValue === true) {
                            has = true;
                        }
                    }

                    if (has === false) {
                        allFound = false;
                        break;
                    }
                }
            }
            // Remove the first value from the stack of traversed values.
            aStack.pop();
            bStack.pop();
            return allFound;
        }
    }

    const bIterator = b[IteratorSymbol]();

    for (const aValue of a) {
        const nextB = bIterator.next();
        if (nextB.done || !jsonEquals(aValue, nextB.value, filteredCustomTesters)) {
            return false;
        }
    }
    if (!bIterator.next().done) {
        return false;
    }

    const aEntries = entries(a);
    const bEntries = entries(b);
    if (!jsonEquals(aEntries, bEntries)) {
        return false;
    }


    // Remove the first value from the stack of traversed values.
    aStack.pop();
    bStack.pop();
    return true;
}

function entries(obj) {
    if (!isObject(obj)) return [];

    const symbolProperties = Object.getOwnPropertySymbols(obj)
        .filter(key => key !== Symbol.iterator)
        .map(key => [key, obj[key]]);

    return [...symbolProperties, ...Object.entries(obj)];
}

function isObjectWithKeys(a) {
    return isObject(a) &&
        !(a instanceof Error) &&
        !Array.isArray(a) &&
        !(a instanceof Date) &&
        !(a instanceof Set) &&
        !(a instanceof Map);
}

/**
 * Subset equality for valid JSON objects.
 * @param {unknown} object
 * @param {unknown} subset
 * @param {import('expect').Tester[]} customTesters
 * @returns {undefined|*}
 */
function jsonSubsetEquality(
    object,
    subset,
    customTesters = [],
) {
    const filteredCustomTesters = customTesters.filter(t => t !== jsonSubsetEquality);

    // subsetEquality needs to keep track of the references
    // it has already visited to avoid infinite loops in case
    // there are circular references in the subset passed to it.

    function subsetEqualityWithContext(seenReferences = new WeakMap()) {
        function tester(object, subset) {
            if (!isObjectWithKeys(subset)) {
                return undefined;
            }

            if (seenReferences.has(subset)) return undefined;
            seenReferences.set(subset, true);

            const matchResult = getObjectKeys(subset).every(key => {
                if (isObjectWithKeys(subset[key])) {
                    if (seenReferences.has(subset[key])) {
                        return jsonEquals(object[key], subset[key], filteredCustomTesters);
                    }
                }
                const result =
                    object != null &&
                    hasPropertyInObject(object, key) &&
                    jsonEquals(object[key], subset[key], [
                        ...filteredCustomTesters,
                        subsetEqualityWithContext(seenReferences),
                    ]);
                // The main goal of using seenReference is to avoid circular node on tree.
                // It will only happen within a parent and its child, not a node and nodes next to it (same level)
                // We should keep the reference for a parent and its child only
                // Thus we should delete the reference immediately so that it doesn't interfere
                // other nodes within the same level on tree.
                seenReferences.delete(subset[key]);
                return result;
            });
            seenReferences.delete(subset);
            return matchResult;
        }

        return tester;
    }

    return subsetEqualityWithContext()(object, subset);
}


module.exports = {getObjectSubset, jsonIterableEquality, jsonSubsetEquality};
