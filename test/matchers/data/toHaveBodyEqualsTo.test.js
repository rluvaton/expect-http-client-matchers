const { toHaveBodyEqualsTo } = require('../../../src');
const { describe, before, it } = require('node:test');
const { buildServer } = require('../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../helpers/server-helper');
const { testClients } = require('../../helpers/supported-clients');

expect.extend({ toHaveBodyEqualsTo });

describe('(.not).toHaveBodyEqualsTo', () => {
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveBodyEqualsTo', () => {
        it('should pass when the expected data match and body is json', async () => {
          const response = await testClient.post(`${apiUrl}/body`, {
            contentType: 'application/json',
            data: {
              a: '1',
              b: 2,
              c: true,
              d: false,
              e: null,
              f: [],
              g: {},
            },
          });

          expect(response).toHaveBodyEqualsTo({
            a: '1',
            b: 2,
            c: true,
            d: false,
            e: null,
            f: [],
            g: {},
          });

          expect({ response }).toEqual({
            response: expect.toHaveBodyEqualsTo({
              a: '1',
              b: 2,
              c: true,
              d: false,
              e: null,
              f: [],
              g: {},
            }),
          });
        });

        it('should pass when the expected data match and body is text', async () => {
          const response = await testClient.post(`${apiUrl}/body`, {
            contentType: 'text/plain',
            data: 'Hello World',
          });

          expect(response).toHaveBodyEqualsTo('Hello World');

          expect({ response }).toEqual({
            response: expect.toHaveBodyEqualsTo('Hello World'),
          });
        });

        it('should pass when the expected data match and body is json when using asymmetric matchers in the data', async () => {
          const response = await testClient.post(`${apiUrl}/body`, {
            contentType: 'application/json',
            data: {
              a: '1',
              b: 2,
              c: true,
              d: false,
              e: null,
              f: [],
              g: {},
            },
          });

          expect(response).toHaveBodyEqualsTo(
            expect.objectContaining({
              b: expect.any(Number),
              c: true,
            }),
          );

          expect({ response }).toEqual({
            response: expect.toHaveBodyEqualsTo(
              expect.objectContaining({
                b: expect.any(Number),
                c: true,
              }),
            ),
          });
        });

        it('should fail when the json data does not match', async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/body`, {
            contentType: 'application/json',
            data: {
              f: 6,
            },
          });

          try {
            expect(response).toHaveBodyEqualsTo({
              a: '1',
              b: 2,
              c: true,
              d: false,
              e: null,
              f: [],
              g: {},
            });
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.toHaveBodyEqualsTo({
                a: '1',
                b: 2,
                c: true,
                d: false,
                e: null,
                f: [],
                g: {},
              }),
            }),
          ).toThrowError(JestAssertionError);
        });

        it('should fail when the text data does not match', async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/body`, {
            contentType: 'text/plain',
            data: 'Hello World',
          });

          try {
            expect(response).toHaveBodyEqualsTo('Someone');
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.toHaveBodyEqualsTo('Someone'),
            }),
          ).toThrowError(JestAssertionError);
        });

        it('should fail when the json data does not match when using asymmetric matchers in the data', async () => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/body`, {
            contentType: 'application/json',
            data: {
              a: '1',
              b: 2,
              c: true,
              d: false,
              e: null,
              f: [],
              g: {},
            },
          });

          try {
            expect(response).toHaveBodyEqualsTo(
              expect.objectContaining({
                a: expect.any(Number),
              }),
            );
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.toHaveBodyEqualsTo(
                expect.objectContaining({
                  a: expect.any(Number),
                }),
              ),
            }),
          ).toThrowError(JestAssertionError);
        });

        it('should fail when the response body type does not match', async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/body`, {
            contentType: 'application/json',
            data: {
              f: 6,
            },
          });

          try {
            expect(response).toHaveBodyEqualsTo('Hello World');
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.toHaveBodyEqualsTo('Hello World'),
            }),
          ).toThrowError(JestAssertionError);
        });
      });

      describe('.not.toHaveBodyEqualsTo', () => {
        it('should pass when the json data does not match', async () => {
          const response = await testClient.post(`${apiUrl}/body`, {
            contentType: 'application/json',
            data: {
              f: 6,
            },
          });

          expect(response).not.toHaveBodyEqualsTo({
            a: '1',
            b: 2,
            c: true,
            d: false,
            e: null,
            f: [],
            g: {},
          });

          expect({ response }).toEqual({
            response: expect.not.toHaveBodyEqualsTo({
              a: '1',
              b: 2,
              c: true,
              d: false,
              e: null,
              f: [],
              g: {},
            }),
          });
        });

        it('should pass when the text data does not match', async () => {
          const response = await testClient.post(`${apiUrl}/body`, {
            contentType: 'text/plain',
            data: 'Hello World',
          });

          expect(response).not.toHaveBodyEqualsTo('Someone');

          expect({ response }).toEqual({
            response: expect.not.toHaveBodyEqualsTo('Someone'),
          });
        });

        it('should pass when the json data does not match when using asymmetric matchers in the data', async () => {
          const response = await testClient.post(`${apiUrl}/body`, {
            contentType: 'application/json',
            data: {
              a: '1',
              b: 2,
              c: true,
              d: false,
              e: null,
              f: [],
              g: {},
            },
          });

          expect(response).not.toHaveBodyEqualsTo(
            expect.objectContaining({
              a: expect.any(Number),
            }),
          );

          expect({ response }).toEqual({
            response: expect.not.toHaveBodyEqualsTo(
              expect.objectContaining({
                a: expect.any(Number),
              }),
            ),
          });
        });

        it('should pass when the response body type does not match', async () => {
          const response = await testClient.post(`${apiUrl}/body`, {
            contentType: 'application/json',
            data: {
              f: 6,
            },
          });

          expect(response).not.toHaveBodyEqualsTo('Hello World');
          expect({ response }).toEqual({
            response: expect.not.toHaveBodyEqualsTo('Hello World'),
          });
        });

        it('should fail when the expected data match and body is json', async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/body`, {
            contentType: 'application/json',
            data: {
              a: '1',
              b: 2,
              c: true,
              d: false,
              e: null,
              f: [],
              g: {},
            },
          });

          try {
            expect(response).toHaveBodyEqualsTo({
              a: '1',
              b: 2,
              c: true,
              d: false,
              e: null,
              f: [],
              g: {},
            });
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.toHaveBodyEqualsTo({
                a: '1',
                b: 2,
                c: true,
                d: false,
                e: null,
                f: [],
                g: {},
              }),
            }),
          ).toThrowError(JestAssertionError);
        });

        it('should fail when the expected data match and body is text', async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/body`, {
            contentType: 'text/plain',
            data: 'Hello World',
          });

          try {
            expect(response).not.toHaveBodyEqualsTo('Hello World');
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.not.toHaveBodyEqualsTo('Hello World'),
            }),
          ).toThrowError(JestAssertionError);
        });

        it('should fail when the expected data match and body is json when using asymmetric matchers in the data', async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/body`, {
            contentType: 'application/json',
            data: {
              a: '1',
              b: 2,
              c: true,
              d: false,
              e: null,
              f: [],
              g: {},
            },
          });

          try {
            expect(response).not.toHaveBodyEqualsTo(
              expect.objectContaining({
                b: expect.any(Number),
                c: true,
              }),
            );
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.not.toHaveBodyEqualsTo(
                expect.objectContaining({
                  b: expect.any(Number),
                  c: true,
                }),
              ),
            }),
          ).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
