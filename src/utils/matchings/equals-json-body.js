// Taken from `@jest/expect-utils` package and modified
// Taken from https://github.com/jestjs/jest/blob/bd1c6db7c15c23788ca3e09c919138e48dd3b28a/packages/expect-utils/src/jasmineUtils.ts

const jsonEquals = (a, b, customTesters, strictCheck) => {
  customTesters = customTesters || [];
  return eq(a, b, new WeakSet(), new WeakSet(), customTesters, strictCheck);
};

/**
 *
 * @param {any} obj
 * @returns {false|value}
 */
function isAsymmetric(obj) {
  return !!obj && isA('Function', obj.asymmetricMatch);
}

/**
 *
 * @param a
 * @param b
 * @returns {undefined|boolean}
 */
function asymmetricMatch(a, b) {
  const asymmetricA = isAsymmetric(a);
  const asymmetricB = isAsymmetric(b);

  if (asymmetricA && asymmetricB) {
    return undefined;
  }

  if (asymmetricA) {
    return a.asymmetricMatch(b);
  }

  if (asymmetricB) {
    return b.asymmetricMatch(a);
  }
}

/**
 *
 * @param {object} jsonBody
 * @param {any} expected
 * @param {WeakSet} visitedJsonBody
 * @param {WeakSet} visitedExpected
 * @param {import('expect').Tester[]} customTesters
 * @param {boolean | undefined} strictCheck
 * @returns {boolean}
 */
function eq(jsonBody, expected, visitedJsonBody, visitedExpected, customTesters, strictCheck) {
  let result = true;

  // 2. Asymmetric matchers checks
  const asymmetricResult = asymmetricMatch(jsonBody, expected);
  if (asymmetricResult !== undefined) {
    return asymmetricResult;
  }

  // If none of the values are asymmetric matchers, we test for equality
  if (jsonBody === expected) {
    return true;
  }

  // If one of them is not valid JSON value than they are not equal
  if (!isValidJSONValue(jsonBody) || !isValidJSONValue(expected)) {
    return false;
  }

  // If one of them is not a valid shallow JSON object than they are not equal
  if (!isValidShallowJsonObject(jsonBody) || !isValidShallowJsonObject(expected)) {
    return false;
  }

  if (jsonBody !== null) {
    // If has circular reference, return false as it's not possible in JSON
    if (visitedJsonBody.has(jsonBody)) {
      return false;
    }

    visitedJsonBody.add(jsonBody);
  }

  if (expected !== null) {
    // If has circular reference, return false as it's not possible in JSON
    if (visitedExpected.has(expected)) {
      return false;
    }

    visitedExpected.add(expected);
  }

  const isJsonBodyArray = Array.isArray(jsonBody);
  const isExpectedArray = Array.isArray(expected);

  // If one of them is an array and the other is not, they are not equal
  if (isJsonBodyArray !== isExpectedArray) {
    return false;
  }

  // If one of them is null (we already checked if both are equal) than they are not equal
  if (jsonBody === null || expected === null) {
    return false;
  }

  /**
   *
   * @type {import('expect').TesterContext}
   */
  const testerContext = { equals: jsonEquals };
  for (const item of customTesters) {
    const customTesterResult = item.call(testerContext, jsonBody, expected, customTesters);
    if (customTesterResult !== undefined) {
      return customTesterResult;
    }
  }

  // Recursively compare objects and arrays.
  // Compare array lengths to determine if jsonBody deep comparison is necessary.
  if (strictCheck && isJsonBodyArray && jsonBody.length !== expected.length) {
    return false;
  }

  // Deep compare objects.
  const jsonBodyKeys = keys(jsonBody, hasKey);
  let key;

  const expectedKeys = keys(expected, hasKey);
  // Add keys corresponding to asymmetric matchers if they miss in non strict check mode
  if (!strictCheck) {
    for (let index = 0; index !== expectedKeys.length; ++index) {
      key = expectedKeys[index];
      if ((isAsymmetric(expected[key]) || expected[key] === undefined) && !hasKey(jsonBody, key)) {
        jsonBodyKeys.push(key);
      }
    }
    for (let index = 0; index !== jsonBodyKeys.length; ++index) {
      key = jsonBodyKeys[index];
      if ((isAsymmetric(jsonBody[key]) || jsonBody[key] === undefined) && !hasKey(expected, key)) {
        expectedKeys.push(key);
      }
    }
  }

  // Ensure that both objects contain the same number of properties before comparing deep equality.
  let size = jsonBodyKeys.length;
  if (expectedKeys.length !== size) {
    return false;
  }

  while (size--) {
    key = jsonBodyKeys[size];

    // Deep compare each member
    if (strictCheck)
      result =
        hasKey(expected, key) &&
        eq(jsonBody[key], expected[key], visitedJsonBody, visitedExpected, customTesters, strictCheck);
    else
      result =
        (hasKey(expected, key) || isAsymmetric(jsonBody[key]) || jsonBody[key] === undefined) &&
        eq(jsonBody[key], expected[key], visitedJsonBody, visitedExpected, customTesters, strictCheck);

    if (!result) {
      return false;
    }
  }

  return result;
}

/**
 *
 * @param {object} obj
 * @param {(obj: object, key: string) => boolean} hasKey
 * @returns {*}
 */
function keys(obj, hasKey) {
  const keys = [];
  for (const key in obj) {
    if (hasKey(obj, key)) {
      keys.push(key);
    }
  }
  return [
    ...keys,
    ...Object.getOwnPropertySymbols(obj).filter((symbol) => Object.getOwnPropertyDescriptor(obj, symbol).enumerable),
  ];
}

/**
 *
 * @param {any} obj
 * @param {string | symbol} key
 * @returns {boolean}
 */
function hasKey(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 *
 * @param {string} typeName
 * @param {unknown} value
 * @returns {value is T}
 * @template T
 */
function isA(typeName, value) {
  return Object.prototype.toString.apply(value) === `[object ${typeName}]`;
}

function isValidJSONValue(value) {
  // valid JSON values:
  // - string
  // - number
  // - object
  // - array
  // - boolean
  // - null

  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // Match object, `null` and arrays
    typeof value === 'object' ||
    typeof value === 'boolean'
  );
}

// Validate that the object itself is valid (without going into its keys)
// we assume that the object has typeof obj === 'object'
function isValidShallowJsonObject(obj) {
  if (Array.isArray(obj) || obj === null) {
    return true;
  }

  const proto = Object.getPrototypeOf(obj);
  return proto === Object.prototype || proto === null;
}

module.exports = { jsonEquals };
