// Taken from `expect-utils` package
// From https://github.com/jestjs/jest/blob/bd1c6db7c15c23788ca3e09c919138e48dd3b28a/packages/expect-utils/src/utils.ts

const { jsonEquals } = require('./equals-json-body');

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
    ...Object.getOwnPropertySymbols(object).filter((s) => Object.getOwnPropertyDescriptor(object, s)?.enumerable),
  ];
}

/**
 * Checks if `hasOwnProperty(object, key)` up the prototype chain, stopping at `Object.prototype`.
 *
 * Taken from @jest/expect-utils
 * https://github.com/jestjs/jest/blob/bd1c6db7c15c23788ca3e09c919138e48dd3b28a/packages/expect-utils/src/utils.ts#L28C1-L45C1
 */
function hasPropertyInObject(object, key) {
  const shouldTerminate = !object || typeof object !== 'object' || object === Object.prototype;

  if (shouldTerminate) {
    return false;
  }

  return Object.prototype.hasOwnProperty.call(object, key) || hasPropertyInObject(Object.getPrototypeOf(object), key);
}

/**
 * Taken from @jest/expect-utils
 * https://github.com/jestjs/jest/blob/bd1c6db7c15c23788ca3e09c919138e48dd3b28a/packages/expect-utils/src/utils.ts#L112C1-L165C3
 *
 * Strip properties from object that are not present in the subset. Useful for
 * printing the diff for toMatchObject() without adding unrelated noise.
 *
 * @param isJson
 * @param {import('expect').MatcherUtils} matcherUtils
 * @param object
 * @param subset
 * @param customTesters
 * @param seenReferences
 */
function getJsonObjectSubset(object, subset, customTesters = [], seenReferences = new WeakMap()) {
  /* eslint-enable @typescript-eslint/explicit-module-boundary-types */
  if (Array.isArray(object)) {
    if (Array.isArray(subset) && subset.length === object.length) {
      // The map method returns correct subclass of subset.
      return subset.map((sub, i) => getJsonObjectSubset(object[i], sub, customTesters));
    }
  } else if (object instanceof Date) {
    return object;
  } else if (isObject(object) && isObject(subset)) {
    if (jsonEquals(object, subset, [...customTesters, jsonSubsetEquality])) {
      // Avoid unnecessary copy which might return Object instead of subclass.
      return subset;
    }

    const trimmed = {};
    seenReferences.set(object, trimmed);

    for (const key of getObjectKeys(object).filter((key) => hasPropertyInObject(subset, key))) {
      trimmed[key] = seenReferences.has(object[key])
        ? seenReferences.get(object[key])
        : getJsonObjectSubset(object[key], subset[key], customTesters, seenReferences);
    }

    if (getObjectKeys(trimmed).length > 0) {
      return trimmed;
    }
  }
  return object;
}

function isObjectWithKeys(a) {
  return (
    isObject(a) &&
    !(a instanceof Error) &&
    !Array.isArray(a) &&
    !(a instanceof Date) &&
    !(a instanceof Set) &&
    !(a instanceof Map)
  );
}

/**
 * Subset equality for valid JSON objects.
 * @param {unknown} object
 * @param {unknown} subset
 * @param {import('expect').Tester[]} customTesters
 * @returns {undefined|*}
 */
function jsonSubsetEquality(object, subset, customTesters = []) {
  const filteredCustomTesters = customTesters.filter((t) => t !== jsonSubsetEquality);

  // subsetEquality needs to keep track of the references
  // it has already visited to avoid infinite loops in case
  // there are circular references in the subset passed to it.

  function subsetEqualityWithContext(seenReferencesObject = new WeakSet(), seenReferencesSubset = new WeakSet()) {
    function tester(object, subset) {
      if (!isObjectWithKeys(subset)) {
        return undefined;
      }
      if (typeof object === 'object' && object !== null) {
        if (seenReferencesObject.has(object)) {
          return false;
        }
        seenReferencesObject.add(object);
      }
      if (typeof subset === 'object' && subset !== null) {
        if (seenReferencesSubset.has(subset)) {
          return false;
        }
        seenReferencesSubset.add(subset);
      }

      const matchResult = getObjectKeys(subset).every((key) => {
        let result;

        if (object == null) {
          return false;
        }

        // If subset[key] is undefined, than the object should not have the key
        if (subset[key] === undefined) {
          return !hasPropertyInObject(object, key);
        }

        result =
          hasPropertyInObject(object, key) &&
          jsonEquals(object[key], subset[key], [
            ...filteredCustomTesters,
            subsetEqualityWithContext(seenReferencesObject, seenReferencesSubset),
          ]);

        return result;
      });

      // The main goal of using seenReference is to avoid circular node on tree.
      // It will only happen within a parent and its child, not a node and nodes next to it (same level)
      // We should keep the reference for a parent and its child only
      // Thus we should delete the reference immediately so that it doesn't interfere
      // other nodes within the same level on tree.
      if (typeof object === 'object' && object !== null) {
        seenReferencesObject.delete(object);
      }
      if (typeof subset === 'object' && subset !== null) {
        seenReferencesSubset.delete(subset);
      }
      return matchResult;
    }

    return tester;
  }

  return subsetEqualityWithContext()(object, subset);
}

module.exports = { getJsonObjectSubset, jsonSubsetEquality };
