const { toHaveBodyEquals } = require('../../../src');
const { describe, before, it } = require('node:test');
const { buildServer } = require('../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../helpers/server-helper');
const { testClients } = require('../../helpers/supported-clients');

expect.extend({ toHaveBodyEquals });

describe('(.not).toHaveBodyEquals', () => {
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveBodyEquals', () => {
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

          expect(response).toHaveBodyEquals({
            a: '1',
            b: 2,
            c: true,
            d: false,
            e: null,
            f: [],
            g: {},
          });

          expect({ response }).toEqual({
            response: expect.toHaveBodyEquals({
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

          expect(response).toHaveBodyEquals('Hello World');

          expect({ response }).toEqual({
            response: expect.toHaveBodyEquals('Hello World'),
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

          expect(response).toHaveBodyEquals(
            expect.objectContaining({
              b: expect.any(Number),
              c: true,
            }),
          );

          expect({ response }).toEqual({
            response: expect.toHaveBodyEquals(
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
            expect(response).toHaveBodyEquals({
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
              response: expect.toHaveBodyEquals({
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
            expect(response).toHaveBodyEquals('Someone');
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.toHaveBodyEquals('Someone'),
            }),
          ).toThrowError(JestAssertionError);
        });

        it('should fail when the json data does not match when using asymmetric matchers in the data', async (t) => {
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
            expect(response).toHaveBodyEquals(
              expect.objectContaining({
                a: expect.any(Number),
              }),
            );
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.toHaveBodyEquals(
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
            expect(response).toHaveBodyEquals('Hello World');
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.toHaveBodyEquals('Hello World'),
            }),
          ).toThrowError(JestAssertionError);
        });
      });

      describe('.not.toHaveBodyEquals', () => {
        it('should pass when the json data does not match', async () => {
          const response = await testClient.post(`${apiUrl}/body`, {
            contentType: 'application/json',
            data: {
              f: 6,
            },
          });

          expect(response).not.toHaveBodyEquals({
            a: '1',
            b: 2,
            c: true,
            d: false,
            e: null,
            f: [],
            g: {},
          });

          expect({ response }).toEqual({
            response: expect.not.toHaveBodyEquals({
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

          expect(response).not.toHaveBodyEquals('Someone');

          expect({ response }).toEqual({
            response: expect.not.toHaveBodyEquals('Someone'),
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

          expect(response).not.toHaveBodyEquals(
            expect.objectContaining({
              a: expect.any(Number),
            }),
          );

          expect({ response }).toEqual({
            response: expect.not.toHaveBodyEquals(
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

          expect(response).not.toHaveBodyEquals('Hello World');
          expect({ response }).toEqual({
            response: expect.not.toHaveBodyEquals('Hello World'),
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
            expect(response).not.toHaveBodyEquals({
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
              response: expect.not.toHaveBodyEquals({
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
            expect(response).not.toHaveBodyEquals('Hello World');
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.not.toHaveBodyEquals('Hello World'),
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
            expect(response).not.toHaveBodyEquals(
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
              response: expect.not.toHaveBodyEquals(
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