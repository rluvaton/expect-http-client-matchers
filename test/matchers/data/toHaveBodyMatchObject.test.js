const { matchers } = require('../../../src');
const { toHaveBodyMatchObject } = matchers;
const { describe, before, it } = require('node:test');
const { buildServer } = require('../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../helpers/server-helper');
const { shouldTestAsymmetricMatcherErrorsSnapshot } = require('../../helpers/can-test-snapshot');
const { testClients } = require('../../helpers/supported-clients');

expect.extend({ toHaveBodyMatchObject });

describe('(.not).toHaveBodyMatchObject', () => {
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveBodyMatchObject', () => {
        it('should fail when the received response body is plain/text data', async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/body`, {
            contentType: 'plain/text',
            data: 'hello world',
          });

          try {
            expect(response).toHaveBodyMatchObject({
              a: '1',
            });
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.toHaveBodyMatchObject({
                a: '1',
              }),
            }),
          ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
        });

        it('should fail when the received response body have content type plain/text even though the data itself is JSON string ', async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/body`, {
            contentType: 'plain/text',
            data: JSON.stringify({}),
          });

          try {
            expect(response).toHaveBodyMatchObject({});
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.toHaveBodyMatchObject({}),
            }),
          ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
        });
      });

      describe('.not.toHaveBodyMatchObject', () => {
        it('should pass when the received response body is plain/text data', async () => {
          const response = await testClient.post(`${apiUrl}/body`, {
            contentType: 'plain/text',
            data: 'hello world',
          });

          expect(response).not.toHaveBodyMatchObject({
            a: '1',
          });

          expect({ response }).toEqual({
            response: expect.not.toHaveBodyMatchObject({
              a: '1',
            }),
          });
        });

        it('should pass when the received response body have content type plain/text even though the data itself is JSON string ', async () => {
          const response = await testClient.post(`${apiUrl}/body`, {
            contentType: 'plain/text',
            data: JSON.stringify({}),
          });

          expect(response).not.toHaveBodyMatchObject({});

          expect({ response }).toEqual({
            response: expect.not.toHaveBodyMatchObject({}),
          });
        });
      });

      it(`content-type application/problem+json`, async () => {
        const response = await testClient.post(`${apiUrl}/body`, {
          contentType: 'application/problem+json',
          data: {
            type: 'https://example.net/validation-error',
            title: "Your request parameters didn't validate.",
          },
        });

        expect(response).toHaveBodyMatchObject({
          type: 'https://example.net/validation-error',
          title: "Your request parameters didn't validate.",
        });
      });

      it(`testing various array matching`, async () => {
        const response = await testClient.post(`${apiUrl}/body`, {
          contentType: 'application/json',
          data: {
            items: [
              { a: 1, b: 2 },
              { a: 3, b: 4 },
            ],
            somethingElse: 3,
          },
        });

        expect(response).toHaveBodyMatchObject({
          items: [
            { a: 1, b: 2 },
            { a: 3, b: 4 },
          ],
        });

        expect(response).toHaveBodyMatchObject({
          items: [{ a: 1 }, { a: 3 }],
        });

        expect(response).not.toHaveBodyMatchObject({
          items: [{ a: 1, b: 2 }],
        });

        expect(response).not.toHaveBodyMatchObject({
          items: [{ a: 3, b: 4 }],
        });
      });

      // Taken from expect `toMatchObject` tests and modified
      // https://github.com/jestjs/jest/blob/bd1c6db7c15c23788ca3e09c919138e48dd3b28a/packages/expect/src/__tests__/matchers.test.js#L2087-L2347
      describe('toMatchObject tests', () => {
        class Foo {
          get a() {
            return undefined;
          }

          get b() {
            return 'b';
          }
        }

        class Sub extends Foo {
          get c() {
            return 'c';
          }
        }

        const withDefineProperty = (obj, key, val) => {
          Object.defineProperty(obj, key, {
            get() {
              return val;
            },
          });

          return obj;
        };

        describe('circular references', () => {
          it('should not pass when expected object contain circular references as its not possible in response object', async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const circularObjA1 = { a: 'hello' };
            circularObjA1.ref = circularObjA1;

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: {
                a: 'hello',
                ref: {},
              },
            });

            try {
              expect(response).toHaveBodyMatchObject(circularObjA1);
            } catch (e) {
              t.assert.snapshot(e);
            }

            expect(() =>
              expect({ response }).toEqual({
                response: expect.toHaveBodyMatchObject(circularObjA1),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it('should not pass when expected object contain transitive circular references as its not possible in response object', async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const transitiveCircularObjA1 = { a: 'hello' };
            transitiveCircularObjA1.nestedObj = { parentObj: transitiveCircularObjA1 };

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: {
                a: 'hello',
                nestedObj: {
                  parentObj: {},
                },
              },
            });

            try {
              expect(response).toHaveBodyMatchObject(transitiveCircularObjA1);
            } catch (e) {
              t.assert.snapshot(e);
            }

            expect(() =>
              expect({ response }).toEqual({
                response: expect.toHaveBodyMatchObject(transitiveCircularObjA1),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });
        });

        describe('Matching', () => {
          it(`response object does not have property and expected body has property undefined should match`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: {},
            });

            expect(response).toHaveBodyMatchObject({
              a: undefined,
            });
            expect({ response }).toEqual({
              response: expect.toHaveBodyMatchObject({ a: undefined }),
            });

            try {
              expect(response).not.toHaveBodyMatchObject({ a: undefined });
            } catch (e) {
              t.assert.snapshot(e);
            }
            expect(() =>
              expect({ response }).toEqual({
                response: expect.not.toHaveBodyMatchObject({ a: undefined }),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should pass when the response body is {a: 'b', c: 'd'} and expected value is {a: 'b'}`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = { a: 'b' };

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: { a: 'b', c: 'd' },
            });

            expect(response).toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).not.toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }
            expect(() =>
              expect({ response }).toEqual({
                response: expect.not.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should pass when the response body is {a: 'b', c: 'd'} and expected value is {a: 'b', c: 'd'}`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = { a: 'b', c: 'd' };

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: { a: 'b', c: 'd' },
            });

            expect(response).toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).not.toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }
            expect(() =>
              expect({ response }).toEqual({
                response: expect.not.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should pass when the response body is {a: 'b', t: {x: {r: 'r'}, z: 'z'}} and expected value is {a: 'b', t: {z: 'z'}}`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = { a: 'b', t: { z: 'z' } };

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: { a: 'b', t: { x: { r: 'r' }, z: 'z' } },
            });

            expect(response).toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).not.toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }
            expect(() =>
              expect({ response }).toEqual({
                response: expect.not.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should pass when the response body is {a: 'b', t: {x: {r: 'r'}, z: 'z'}} and expected value is {t: {x: {r: 'r'}}}`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = { t: { x: { r: 'r' } } };

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: { a: 'b', t: { x: { r: 'r' }, z: 'z' } },
            });

            expect(response).toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).not.toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }
            expect(() =>
              expect({ response }).toEqual({
                response: expect.not.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should pass when the response body is {a: [3, 4, 5], b: 'b'} and expected value is {a: [3, 4, 5]}`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = { a: [3, 4, 5] };

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: { a: [3, 4, 5], b: 'b' },
            });

            expect(response).toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).not.toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }
            expect(() =>
              expect({ response }).toEqual({
                response: expect.not.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should pass when the response body is {a: [3, 4, 5, 'v'], b: 'b'} and expected value is {a: [3, 4, 5, 'v']}`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = { a: [3, 4, 5, 'v'] };

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: { a: [3, 4, 5, 'v'], b: 'b' },
            });

            expect(response).toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).not.toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }
            expect(() =>
              expect({ response }).toEqual({
                response: expect.not.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should pass when the response body is {a: 1, c: 2} and expected value is {a: expect.any(Number)}`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = { a: expect.any(Number) };

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: { a: 1, c: 2 },
            });

            expect(response).toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).not.toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }
            expect(() =>
              expect({ response }).toEqual({
                response: expect.not.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should pass when the response body is {a: {x: 'x', y: 'y'}} and expected value is {a: {x: expect.any(String)}}`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = { a: { x: expect.any(String) } };

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: { a: { x: 'x', y: 'y' } },
            });

            expect(response).toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).not.toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }
            expect(() =>
              expect({ response }).toEqual({
                response: expect.not.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should pass when the response body is {a: null, b: 'b'} and expected value is {a: null}`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = { a: null };

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: { a: null, b: 'b' },
            });

            expect(response).toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).not.toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }
            expect(() =>
              expect({ response }).toEqual({
                response: expect.not.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should pass when the response body is {b: 'b'} and expected value is {}`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = {};

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: { b: 'b' },
            });

            expect(response).toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).not.toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }
            expect(() =>
              expect({ response }).toEqual({
                response: expect.not.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should pass when the response body is {a: [{a: 'a', b: 'b'}]} and expected value is {a: [{a: 'a'}]}`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = { a: [{ a: 'a' }] };

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: { a: [{ a: 'a', b: 'b' }] },
            });

            expect(response).toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).not.toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }
            expect(() =>
              expect({ response }).toEqual({
                response: expect.not.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should pass when the response body is [1, 2] and expected value is [1, 2]`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = [1, 2];

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: [1, 2],
            });

            expect(response).toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).not.toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }
            expect(() =>
              expect({ response }).toEqual({
                response: expect.not.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should pass when the response body is {} and expected value is {}`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = {};

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: {},
            });

            expect(response).toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).not.toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }
            expect(() =>
              expect({ response }).toEqual({
                response: expect.not.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should pass when the response body is [] and expected value is []`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = [];

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: [],
            });

            expect(response).toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).not.toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }
            expect(() =>
              expect({ response }).toEqual({
                response: expect.not.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should pass when the response body is {message: 'bar'} and expected value is {message: 'bar'}`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = { message: 'bar' };

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: { message: 'bar' },
            });

            expect(response).toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).not.toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }
            expect(() =>
              expect({ response }).toEqual({
                response: expect.not.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should pass when the response body is {a: 'b'} and expected value is Object.assign(Object.create(null), {a: 'b'})`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = Object.assign(Object.create(null), { a: 'b' });

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: { a: 'b' },
            });

            expect(response).toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).not.toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }

            // Not testing asymmetric matcher throwing as it will fail to build the error because of the null prototype object
            // expect(() =>
            //     expect({response}).toEqual({
            //         response: expect.not.toHaveBodyMatchObject(expectedValue),
            //     }),
            // ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should pass when the response body is [0] and expected value is [-0] as -0 and 0 are the same value in JSON`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = [-0];

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: [0],
            });

            expect(response).toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).not.toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }
            expect(() =>
              expect({ response }).toEqual({
                response: expect.not.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });
        });

        describe('Not matching', () => {
          it(`should not match when the response body is {a: 'b', c: 'd'} and expected value is {e: 'b'}`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = { e: 'b' };

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: { a: 'b', c: 'd' },
            });

            expect(response).not.toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.not.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }

            expect(() =>
              expect({ response }).toEqual({
                response: expect.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should not match when the response body is {a: 'b', c: 'd'} and expected value is {a: 'b!', c: 'd'}`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = { a: 'b!', c: 'd' };

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: { a: 'b', c: 'd' },
            });

            expect(response).not.toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.not.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }

            expect(() =>
              expect({ response }).toEqual({
                response: expect.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should not match when the response body is {a: 'a', c: 'd'} and expected value is {a: expect.any(Number)}`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = { a: expect.any(Number) };

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: { a: 'a', c: 'd' },
            });

            expect(response).not.toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.not.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }

            expect(() =>
              expect({ response }).toEqual({
                response: expect.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should not match when the response body is {a: 'b', t: {x: {r: 'r'}, z: 'z'}} and expected value is {a: 'b', t: {z: [3]}}`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = { a: 'b', t: { z: [3] } };

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: { a: 'b', t: { x: { r: 'r' }, z: 'z' } },
            });

            expect(response).not.toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.not.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }

            expect(() =>
              expect({ response }).toEqual({
                response: expect.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should not match when the response body is {a: 'b', t: {x: {r: 'r'}, z: 'z'}} and expected value is {t: {l: {r: 'r'}}}`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = { t: { l: { r: 'r' } } };

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: { a: 'b', t: { x: { r: 'r' }, z: 'z' } },
            });

            expect(response).not.toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.not.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }

            expect(() =>
              expect({ response }).toEqual({
                response: expect.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should not match when the response body is {a: [3, 4, 5], b: 'b'} and expected value is {a: [3, 4, 5, 6]}`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = { a: [3, 4, 5, 6] };

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: { a: [3, 4, 5], b: 'b' },
            });

            expect(response).not.toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.not.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }

            expect(() =>
              expect({ response }).toEqual({
                response: expect.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should not match when the response body is {a: [3, 4, 5], b: 'b'} and expected value is {a: [3, 4]}`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = { a: [3, 4] };

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: { a: [3, 4, 5], b: 'b' },
            });

            expect(response).not.toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.not.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }

            expect(() =>
              expect({ response }).toEqual({
                response: expect.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should not match when the response body is {a: [3, 4, 'v'], b: 'b'} and expected value is {a: ['v']}`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = { a: ['v'] };

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: { a: [3, 4, 'v'], b: 'b' },
            });

            expect(response).not.toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.not.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }

            expect(() =>
              expect({ response }).toEqual({
                response: expect.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should not match when the response body is {a: [3, 4, 5], b: 'b'} and expected value is {a: {b: 4}}`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = { a: { b: 4 } };

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: { a: [3, 4, 5], b: 'b' },
            });

            expect(response).not.toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.not.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }

            expect(() =>
              expect({ response }).toEqual({
                response: expect.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should not match when the response body is {a: [3, 4, 5], b: 'b'} and expected value is {a: {b: expect.any(String)}}`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = { a: { b: expect.any(String) } };

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: { a: [3, 4, 5], b: 'b' },
            });

            expect(response).not.toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.not.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }

            expect(() =>
              expect({ response }).toEqual({
                response: expect.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should not match when the response body is [1, 2] and expected value is [1, 3]`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = [1, 3];

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: [1, 2],
            });

            expect(response).not.toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.not.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }

            expect(() =>
              expect({ response }).toEqual({
                response: expect.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should not match when the response body is {a: {}} and expected value is {a: new Set([])}`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = { a: new Set([]) };

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: { a: {} },
            });

            expect(response).not.toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.not.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }

            expect(() =>
              expect({ response }).toEqual({
                response: expect.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should not match when the response body is {a: new Date('2015-11-30').toISOString(), b: 'b'} and expected value is {a: new Date('2015-10-10')}`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = { a: new Date('2015-10-10') };

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: { a: new Date('2015-11-30').toISOString(), b: 'b' },
            });

            expect(response).not.toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.not.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }

            expect(() =>
              expect({ response }).toEqual({
                response: expect.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should not match when the response body is {a: null, b: 'b'} and expected value is {a: '4'}`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = { a: '4' };

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: { a: null, b: 'b' },
            });

            expect(response).not.toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.not.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }

            expect(() =>
              expect({ response }).toEqual({
                response: expect.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should not match when the response body is {} and expected value is  {a: null}`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = { a: null };

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: {},
            });

            expect(response).not.toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.not.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }

            expect(() =>
              expect({ response }).toEqual({
                response: expect.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should not match when the response body is {a: [{a: 'a', b: 'b'}]} and expected value is {a: [{a: 'c'}]}`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = { a: [{ a: 'c' }] };

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: { a: [{ a: 'a', b: 'b' }] },
            });

            expect(response).not.toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.not.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }

            expect(() =>
              expect({ response }).toEqual({
                response: expect.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should not match when the response body is {a: 1, b: 1, c: 1, d: {e: {f: 555}}} and expected value is {d: {e: {f: 222}}}`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = { d: { e: { f: 222 } } };

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: { a: 1, b: 1, c: 1, d: { e: { f: 555 } } },
            });

            expect(response).not.toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.not.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }

            expect(() =>
              expect({ response }).toEqual({
                response: expect.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should not match when the response body is [1, 2, 3] and expected value is [2, 3, 1]`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = [2, 3, 1];

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: [1, 2, 3],
            });

            expect(response).not.toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.not.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }

            expect(() =>
              expect({ response }).toEqual({
                response: expect.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should not match when the response body is [1, 2, 3] and expected value is [1, 2, 2]`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = [1, 2, 2];

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: [1, 2, 3],
            });

            expect(response).not.toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.not.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }

            expect(() =>
              expect({ response }).toEqual({
                response: expect.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should not match when the response body is {c: 'd'} and expected value is Object.assign(Object.create(null), {a: 'b'})`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = Object.assign(Object.create(null), { a: 'b' });

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: { c: 'd' },
            });

            expect(response).not.toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.not.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }

            // Not testing asymmetric matcher throwing as it will fail to build the error because of the null prototype object
            // expect(() =>
            //     expect({response}).toEqual({
            //         response: expect.toHaveBodyMatchObject(expectedValue),
            //     }),
            // ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should not match when the response body is { a: 'b', c: 'd', [Symbol.for('expect-http-client-matchers').toString()]: 'expect-http-client-matchers' } and expected value is {a: 'c', [Symbol.for('expect-http-client-matchers')]: expect.any(String)}`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = { a: 'c', [Symbol.for('expect-http-client-matchers')]: expect.any(String) };

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: {
                a: 'b',
                c: 'd',
                [Symbol.for('expect-http-client-matchers').toString()]: 'expect-http-client-matchers',
              },
            });

            expect(response).not.toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.not.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }

            expect(() =>
              expect({ response }).toEqual({
                response: expect.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should not match when the response body is { a: 'b', c: 'd', [Symbol.for('expect-http-client-matchers').toString()]: 'expect-http-client-matchers' } and expected value is {a: 'b', [Symbol.for('expect-http-client-matchers')]: 'expect-http-client-matchers'}`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = {
              a: 'b',
              [Symbol.for('expect-http-client-matchers')]: 'expect-http-client-matchers',
            };

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: {
                a: 'b',
                c: 'd',
                [Symbol.for('expect-http-client-matchers').toString()]: 'expect-http-client-matchers',
              },
            });

            expect(response).not.toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.not.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }

            expect(() =>
              expect({ response }).toEqual({
                response: expect.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should not match when the response body is {a: 'b', c: 'd', [Symbol.for('expect-http-client-matchers').toString()]: 'expect-http-client-matchers'} and expected value is {a: 'b', c: 'd', [Symbol.for('expect-http-client-matchers')]: 'expect-http-client-matchers'}`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = {
              a: 'b',
              c: 'd',
              [Symbol.for('expect-http-client-matchers')]: 'expect-http-client-matchers',
            };

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: {
                a: 'b',
                c: 'd',
                [Symbol.for('expect-http-client-matchers').toString()]: 'expect-http-client-matchers',
              },
            });

            expect(response).not.toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.not.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }

            expect(() =>
              expect({ response }).toEqual({
                response: expect.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should not match when the response body is {a: undefined, b: 'b'} and expected value is new Foo() as cant match because classes are not valid JSON value`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = new Foo();

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: { a: undefined, b: 'b' },
            });

            expect(response).not.toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.not.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }

            expect(() =>
              expect({ response }).toEqual({
                response: expect.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should not match when the response body is {a: undefined, b: 'b', c: 'c'} and expected value is new Sub()`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = new Sub();

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: { a: undefined, b: 'b', c: 'c' },
            });

            expect(response).not.toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.not.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }

            expect(() =>
              expect({ response }).toEqual({
                response: expect.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });

          it(`should not match when the response body is {d: 4} and expected value is withDefineProperty(new Sub(), 'd', 4)`, async (t) => {
            // Should have the assert snapshot assertion
            t.plan(1);

            const expectedValue = withDefineProperty(new Sub(), 'd', 4);

            const response = await testClient.post(`${apiUrl}/body`, {
              contentType: 'application/json',
              data: { d: 4 },
            });

            expect(response).not.toHaveBodyMatchObject(expectedValue);
            expect({ response }).toEqual({
              response: expect.not.toHaveBodyMatchObject(expectedValue),
            });

            try {
              expect(response).toHaveBodyMatchObject(expectedValue);
            } catch (e) {
              t.assert.snapshot(e);
            }

            expect(() =>
              expect({ response }).toEqual({
                response: expect.toHaveBodyMatchObject(expectedValue),
              }),
            ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
          });
        });

        describe('Validation', () => {
          for (const expected of [null, 4, 'some string', true, undefined]) {
            it(`throws when expected is ${JSON.stringify(expected)}`, async () => {
              const response = await testClient.post(`${apiUrl}/body`, {
                contentType: 'application/json',
                data: {},
              });

              expect(() => expect(response).toHaveBodyMatchObject(expected)).toThrowError(
                'toHaveBodyMatchObject expects non-null object as the expected',
              );

              expect(() => expect(response).not.toHaveBodyMatchObject(expected)).toThrowError(
                'toHaveBodyMatchObject expects non-null object as the expected',
              );

              expect(() =>
                expect({ response }).toEqual({
                  response: expect.toHaveBodyMatchObject(expected),
                }),
              ).toThrowError('toHaveBodyMatchObject expects non-null object as the expected');

              expect(() =>
                expect({ response }).toEqual({
                  response: expect.not.toHaveBodyMatchObject(expected),
                }),
              ).toThrowError('toHaveBodyMatchObject expects non-null object as the expected');
            });
          }
        });
      });
    });
  }
});
