// Taken from @jest/expect-utils and modified
// https://github.com/jestjs/jest/blob/bd1c6db7c15c23788ca3e09c919138e48dd3b28a/packages/expect-utils/src/__tests__/utils.test.ts

const { describe, test } = require('node:test');
const { expect } = require('expect');
const { jsonSubsetEquality, getJsonObjectSubset } = require('../../../src/utils/matchings/equality-testers');
const util = require('node:util');

describe('Modified jest code', () => {
  describe('getJsonObjectSubset', () => {
    for (const [object, subset, expected] of [
      [{ a: 'b', c: 'd' }, { a: 'd' }, { a: 'b' }],
      [{ a: [1, 2], b: 'b' }, { a: [3, 4] }, { a: [1, 2] }],
      [[{ a: 'b', c: 'd' }], [{ a: 'z' }], [{ a: 'b' }]],
      [
        [1, 2],
        [1, 2, 3],
        [1, 2],
      ],
      [{ a: [1] }, { a: [1, 2] }, { a: [1] }],
      [new Date('2015-11-30'), new Date('2016-12-30'), new Date('2015-11-30')],
    ]) {
      test(
        `expect(getJsonObjectSubset(${util.inspect(object)}, ${util.inspect(subset)}))` +
          `.toEqual(${util.inspect(expected)})`,
        () => {
          expect(getJsonObjectSubset(object, subset)).toEqual(expected);
        },
      );
    }

    describe('returns the object instance if the subset has no extra properties', () => {
      test('Date', () => {
        const object = new Date('2015-11-30');
        const subset = new Date('2016-12-30');

        expect(getJsonObjectSubset(object, subset)).toBe(object);
      });
    });

    describe('returns the subset instance if its property values are equal', () => {
      test('Object', () => {
        const object = { key0: 'zero', key1: 'one', key2: 'two' };
        const subset = { key0: 'zero', key2: 'two' };

        expect(getJsonObjectSubset(object, subset)).toBe(subset);
      });
    });

    describe('calculating subsets of objects with circular references', () => {
      test('simple circular references', () => {
        // type CircularObj = {a?: string; b?: string; ref?: unknown};

        const nonCircularObj = { a: 'world', b: 'something' };

        const circularObjA = { a: 'hello' };
        circularObjA.ref = circularObjA;

        const circularObjB = { a: 'world' };
        circularObjB.ref = circularObjB;

        const primitiveInsteadOfRef = { b: 'something' };
        primitiveInsteadOfRef.ref = 'not a ref';

        const nonCircularRef = { b: 'something' };
        nonCircularRef.ref = {};

        expect(getJsonObjectSubset(circularObjA, nonCircularObj)).toEqual({
          a: 'hello',
        });
        expect(getJsonObjectSubset(nonCircularObj, circularObjA)).toEqual({
          a: 'world',
        });

        expect(getJsonObjectSubset(circularObjB, circularObjA)).toEqual(circularObjB);

        expect(getJsonObjectSubset(primitiveInsteadOfRef, circularObjA)).toEqual({
          ref: 'not a ref',
        });
        expect(getJsonObjectSubset(nonCircularRef, circularObjA)).toEqual({
          ref: {},
        });
      });

      test('transitive circular references', () => {
        // type CircularObj = {a?: string; nestedObj?: unknown};

        const nonCircularObj = { a: 'world', b: 'something' };

        const transitiveCircularObjA = { a: 'hello' };
        transitiveCircularObjA.nestedObj = { parentObj: transitiveCircularObjA };

        const transitiveCircularObjB = { a: 'world' };
        transitiveCircularObjB.nestedObj = { parentObj: transitiveCircularObjB };

        const primitiveInsteadOfRef = {};
        primitiveInsteadOfRef.nestedObj = { otherProp: 'not the parent ref' };

        const nonCircularRef = {};
        nonCircularRef.nestedObj = { otherProp: {} };

        expect(getJsonObjectSubset(transitiveCircularObjA, nonCircularObj)).toEqual({
          a: 'hello',
        });
        expect(getJsonObjectSubset(nonCircularObj, transitiveCircularObjA)).toEqual({
          a: 'world',
        });

        expect(getJsonObjectSubset(transitiveCircularObjB, transitiveCircularObjA)).toEqual(transitiveCircularObjB);

        expect(getJsonObjectSubset(primitiveInsteadOfRef, transitiveCircularObjA)).toEqual({
          nestedObj: { otherProp: 'not the parent ref' },
        });
        expect(getJsonObjectSubset(nonCircularRef, transitiveCircularObjA)).toEqual({
          nestedObj: { otherProp: {} },
        });
      });
    });
  });

  describe('jsonSubsetEquality()', () => {
    test('matching object returns true', () => {
      expect(jsonSubsetEquality({ foo: 'bar' }, { foo: 'bar' })).toBe(true);
    });

    test('object without keys is undefined', () => {
      expect(jsonSubsetEquality('foo', 'bar')).toBeUndefined();
    });

    test('objects to not match', () => {
      expect(jsonSubsetEquality({ foo: 'bar' }, { foo: 'baz' })).toBe(false);
      expect(jsonSubsetEquality('foo', { foo: 'baz' })).toBe(false);
    });

    test('null does not return errors', () => {
      expect(jsonSubsetEquality(null, { foo: 'bar' })).not.toBeTruthy();
    });

    test('undefined does not return errors', () => {
      expect(jsonSubsetEquality(undefined, { foo: 'bar' })).not.toBeTruthy();
    });

    describe('not matching any circular references as they are not supported in JSON', () => {
      test('simple circular references', () => {
        // type CircularObj = {a?: string; ref?: unknown};

        const circularObjA1 = { a: 'hello' };
        circularObjA1.ref = circularObjA1;

        const circularObjA2 = { a: 'hello' };
        circularObjA2.ref = circularObjA2;

        const circularObjB = { a: 'world' };
        circularObjB.ref = circularObjB;

        const primitiveInsteadOfRef = {};
        primitiveInsteadOfRef.ref = 'not a ref';

        // This is true as we did not check for circular references as the subset is empty
        expect(jsonSubsetEquality(circularObjA1, {})).toBe(true);

        expect(jsonSubsetEquality({}, circularObjA1)).toBe(false);
        expect(jsonSubsetEquality(circularObjA2, circularObjA1)).toBe(false);
        expect(jsonSubsetEquality(circularObjB, circularObjA1)).toBe(false);
        expect(jsonSubsetEquality(primitiveInsteadOfRef, circularObjA1)).toBe(false);
      });

      test('referenced object on same level should not regarded as circular reference', () => {
        const referencedObj = { abc: 'def' };
        const object = {
          a: { abc: 'def' },
          b: { abc: 'def', zzz: 'zzz' },
        };
        const thisIsNotCircular = {
          a: referencedObj,
          b: referencedObj,
        };
        expect(jsonSubsetEquality(object, thisIsNotCircular)).toBeTruthy();
      });

      test('referenced object on object and subset should not be regarded as circular references', () => {
        const referencedObj = { abc: 'def' };
        const object = {
          a: referencedObj,
          b: referencedObj,
        };
        const thisIsNotCircular = {
          a: referencedObj,
          b: referencedObj,
        };
        expect(jsonSubsetEquality(object, thisIsNotCircular)).toBeTruthy();
      });

      test('transitive circular references should always return false as they are not possible in JSON', () => {
        // type CircularObj = {a: string; nestedObj?: unknown};

        const transitiveCircularObjA1 = { a: 'hello' };
        transitiveCircularObjA1.nestedObj = { parentObj: transitiveCircularObjA1 };

        const transitiveCircularObjA2 = { a: 'hello' };
        transitiveCircularObjA2.nestedObj = {
          parentObj: transitiveCircularObjA2,
        };

        const transitiveCircularObjB = { a: 'world' };
        transitiveCircularObjB.nestedObj = {
          parentObj: transitiveCircularObjB,
        };

        const primitiveInsteadOfRef = {
          parentObj: 'not the parent ref',
        };

        // This is true as we did not check for circular references as the subset is empty
        expect(jsonSubsetEquality(transitiveCircularObjA1, {})).toBe(true);
        expect(jsonSubsetEquality({}, transitiveCircularObjA1)).toBe(false);
        expect(jsonSubsetEquality(transitiveCircularObjA2, transitiveCircularObjA1)).toBe(false);
        expect(jsonSubsetEquality(transitiveCircularObjB, transitiveCircularObjA1)).toBe(false);
        expect(jsonSubsetEquality(primitiveInsteadOfRef, transitiveCircularObjA1)).toBe(false);
      });
    });

    describe('matching subsets with symbols', () => {
      describe('same symbol', () => {
        test('objects to not match with value diff', () => {
          const symbol = Symbol('foo');
          expect(jsonSubsetEquality({ [symbol]: 1 }, { [symbol]: 2 })).toBe(false);
        });

        test('objects to match with non-enumerable symbols', () => {
          const symbol = Symbol('foo');
          const foo = {};
          Object.defineProperty(foo, symbol, {
            enumerable: false,
            value: 1,
          });
          const bar = {};
          Object.defineProperty(bar, symbol, {
            enumerable: false,
            value: 2,
          });
          expect(jsonSubsetEquality(foo, bar)).toBe(true);
        });
      });

      describe('different symbol', () => {
        test('objects to not match with same value', () => {
          expect(jsonSubsetEquality({ [Symbol('foo')]: 1 }, { [Symbol('foo')]: 2 })).toBe(false);
        });
        test('objects to match with non-enumerable symbols', () => {
          const foo = {};
          Object.defineProperty(foo, Symbol('foo'), {
            enumerable: false,
            value: 1,
          });
          const bar = {};
          Object.defineProperty(bar, Symbol('foo'), {
            enumerable: false,
            value: 2,
          });
          expect(jsonSubsetEquality(foo, bar)).toBe(true);
        });
      });
    });

    describe('subset is not object with keys', () => {
      test('returns true if subset has keys', () => {
        expect(jsonSubsetEquality({ foo: 'bar' }, { foo: 'bar' })).toBe(true);
      });
      test('returns true if subset has Symbols', () => {
        const symbol = Symbol('foo');
        expect(jsonSubsetEquality({ [symbol]: 'bar' }, { [symbol]: 'bar' })).toBe(true);
      });
      test('returns undefined if subset has no keys', () => {
        expect(jsonSubsetEquality('foo', 'bar')).toBeUndefined();
      });
      test('returns undefined if subset is null', () => {
        expect(jsonSubsetEquality({ foo: 'bar' }, null)).toBeUndefined();
      });
      test('returns undefined if subset is Error', () => {
        expect(jsonSubsetEquality({ foo: 'bar' }, new Error())).toBeUndefined();
      });
      test('returns undefined if subset is Array', () => {
        expect(jsonSubsetEquality({ foo: 'bar' }, [])).toBeUndefined();
      });
      test('returns undefined if subset is Date', () => {
        expect(jsonSubsetEquality({ foo: 'bar' }, new Date())).toBeUndefined();
      });
      test('returns undefined if subset is Set', () => {
        expect(jsonSubsetEquality({ foo: 'bar' }, new Set())).toBeUndefined();
      });
      test('returns undefined if subset is Map', () => {
        expect(jsonSubsetEquality({ foo: 'bar' }, new Map())).toBeUndefined();
      });
    });
  });
});
