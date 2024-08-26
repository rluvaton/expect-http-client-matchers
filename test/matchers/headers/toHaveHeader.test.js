const { matchers } = require('../../../src');
const { toHaveHeader } = matchers;
const { describe, before, it } = require('node:test');
const { buildServer } = require('../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../helpers/server-helper');
const { testClients } = require('../../helpers/supported-clients');
const { shouldTestAsymmetricMatcherErrorsSnapshot } = require('../../helpers/can-test-snapshot');

expect.extend({ toHaveHeader });

describe('(.not).toHaveHeader', () => {
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveHeader', () => {
        it('should throw an error when passing as the expected header name value that is not string', async () => {
          const response = await testClient.post(`${apiUrl}/headers`, {
            'x-custom-header': 'some value',
          });

          expect(() => expect({ response }).toHaveHeader(expect.any(String))).toThrowError(
            'toHaveHeader expects a string as the expected header name',
          );

          expect(() =>
            expect({ response }).toEqual({
              response: expect.toHaveHeader(expect.any(String)),
            }),
          ).toThrowError('toHaveHeader expects a string as the expected header name');
        });

        it('should throw an error when passing as the expected header name value that is not string and the expected value is also provided', async () => {
          const response = await testClient.post(`${apiUrl}/headers`, {
            'x-custom-header': 'some value',
          });

          expect(() => expect({ response }).toHaveHeader(expect.any(String), 'some value')).toThrowError(
            'toHaveHeader expects a string as the expected header name',
          );

          expect(() =>
            expect({ response }).toEqual({
              response: expect.toHaveHeader(expect.any(String), 'some value'),
            }),
          ).toThrowError('toHaveHeader expects a string as the expected header name');
        });

        it('should pass when the expected header is present and not providing expected header value', async () => {
          const response = await testClient.post(`${apiUrl}/headers`, {
            'x-custom-header': 'some value',
            Accept: 'application/json',
          });

          expect(response).toHaveHeader('x-custom-header');
          expect(response).toHaveHeader('Accept');
          expect({ response }).toEqual({
            response: expect.toHaveHeader('x-custom-header'),
          });
          expect({ response }).toEqual({
            response: expect.toHaveHeader('Accept'),
          });
        });

        it('should pass when the expected header is present and the value is provided and match', async () => {
          const response = await testClient.post(`${apiUrl}/headers`, {
            'x-custom-header': 'some value',
            Accept: 'application/json',
          });

          expect(response).toHaveHeader('x-custom-header', 'some value');
          expect(response).toHaveHeader('Accept', 'application/json');
          expect({ response }).toEqual({
            response: expect.toHaveHeader('x-custom-header', 'some value'),
          });
          expect({ response }).toEqual({
            response: expect.toHaveHeader('Accept', 'application/json'),
          });
        });

        it('should pass when the expected header is present and the expected value is matching asymmetric matcher', async () => {
          const response = await testClient.post(`${apiUrl}/headers`, {
            'x-custom-header': 'some value',
            Accept: 'application/json',
          });

          expect(response).toHaveHeader('x-custom-header', expect.any(String));
          expect(response).toHaveHeader('x-custom-header', expect.stringContaining('some'));
          expect(response).toHaveHeader('accept', expect.any(String));
          expect(response).toHaveHeader('accept', expect.stringContaining('application'));

          expect({ response }).toEqual({
            response: expect.toHaveHeader('x-custom-header', expect.any(String)),
          });
          expect({ response }).toEqual({
            response: expect.toHaveHeader('x-custom-header', expect.stringContaining('some')),
          });
          expect({ response }).toEqual({
            response: expect.toHaveHeader('accept', expect.any(String)),
          });
          expect({ response }).toEqual({
            response: expect.toHaveHeader('accept', expect.stringContaining('application')),
          });
        });

        it('should pass when the expected header is present even when the header case is not the same (case insensitive)', async () => {
          const response = await testClient.post(`${apiUrl}/headers`, {
            'x-cUsToM-header': 'some value',
          });

          expect(response).toHaveHeader('x-CuStOm-heAdEr');
          expect(response).toHaveHeader('X-CUSTOM-HEADER');
          expect(response).toHaveHeader('x-custom-header');

          expect({ response }).toEqual({
            response: expect.toHaveHeader('x-CuStOm-heAdEr'),
          });
          expect({ response }).toEqual({
            response: expect.toHaveHeader('X-CUSTOM-HEADER'),
          });
          expect({ response }).toEqual({
            response: expect.toHaveHeader('x-custom-header'),
          });
        });

        it('should pass when the expected header is present even when the header case is not the same (case insensitive) and expected value is provided', async () => {
          const response = await testClient.post(`${apiUrl}/headers`, {
            'x-cUsToM-header': 'some value',
          });

          expect(response).toHaveHeader('x-CuStOm-heAdEr', 'some value');
          expect(response).toHaveHeader('X-CUSTOM-HEADER', 'some value');
          expect(response).toHaveHeader('x-custom-header', 'some value');

          expect({ response }).toEqual({
            response: expect.toHaveHeader('x-CuStOm-heAdEr', 'some value'),
          });
          expect({ response }).toEqual({
            response: expect.toHaveHeader('X-CUSTOM-HEADER', 'some value'),
          });
          expect({ response }).toEqual({
            response: expect.toHaveHeader('x-custom-header', 'some value'),
          });
        });

        it('should fail when the expected header is missing', async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/headers`, {
            'x-custom-header': 'some value',
            Accept: 'application/json',
          });

          try {
            expect(response).toHaveHeader('Authorization');
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.toHaveHeader('Authorization'),
            }),
          ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
        });

        it('should fail when the expected header is missing and there is another header that contain the expected header', async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/headers`, {
            'X-Custom-Header': 'some value',
          });

          try {
            expect(response).toHaveHeader('X-Custom');
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.toHaveHeader('X-Custom'),
            }),
          ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
        });

        it('should fail when the expected header is missing and there is another header that is substring of the expected header', async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/headers`, {
            'X-Custom': 'some value',
          });

          try {
            expect(response).toHaveHeader('X-Custom-Header');
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.toHaveHeader('X-Custom-Header'),
            }),
          ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
        });

        it('should fail when the expected header is missing when expected header value is provided', async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/headers`, {
            'x-custom-header': 'some value',
            Accept: 'application/json',
          });

          try {
            expect(response).toHaveHeader('Authorization', 'hello');
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.toHaveHeader('Authorization', 'hello'),
            }),
          ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
        });

        it('should fail when the expected header exist but the expected value does not match', async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/headers`, {
            'x-custom-header': 'some value',
            Accept: 'application/json',
          });

          try {
            expect(response).toHaveHeader('x-custom-header', 'hello');
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.toHaveHeader('x-custom-header', 'hello'),
            }),
          ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
        });

        it('should fail when the expected header exist but the expected value does not match but the value match another header value', async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/headers`, {
            'x-custom-header': 'some value',
            Accept: 'application/json',
          });

          try {
            expect(response).toHaveHeader('x-custom-header', 'application/json');
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.toHaveHeader('x-custom-header', 'application/json'),
            }),
          ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
        });

        it('should fail when the expected header exist and passing asymmetric matcher as the expected value that does not match', async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/headers`, {
            'x-custom-header': 'some value',
            Accept: 'application/json',
          });

          try {
            expect(response).toHaveHeader('x-custom-header', expect.any(Number));
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.toHaveHeader('x-custom-header', expect.any(Number)),
            }),
          ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
        });
      });

      describe('.not.toHaveHeader', () => {
        it('should throw an error when passing as the expected header name value that is not string', async () => {
          const response = await testClient.post(`${apiUrl}/headers`, {
            'x-custom-header': 'some value',
          });

          expect(() => expect({ response }).not.toHaveHeader(expect.any(String))).toThrowError(
            'toHaveHeader expects a string as the expected header name',
          );

          expect(() =>
            expect({ response }).toEqual({
              response: expect.not.toHaveHeader(expect.any(String)),
            }),
          ).toThrowError('toHaveHeader expects a string as the expected header name');
        });

        it('should throw an error when passing as the expected header name value that is not string and the expected value is also provided', async () => {
          const response = await testClient.post(`${apiUrl}/headers`, {
            'x-custom-header': 'some value',
          });

          expect(() => expect({ response }).not.toHaveHeader(expect.any(String), 'some value')).toThrowError(
            'toHaveHeader expects a string as the expected header name',
          );

          expect(() =>
            expect({ response }).toEqual({
              response: expect.not.toHaveHeader(expect.any(String), 'some value'),
            }),
          ).toThrowError('toHaveHeader expects a string as the expected header name');
        });

        it('should pass when the expected header is missing', async () => {
          const response = await testClient.post(`${apiUrl}/headers`, {
            'x-custom-header': 'some value',
            Accept: 'application/json',
          });

          expect(response).not.toHaveHeader('Authorization');

          expect({ response }).toEqual({
            response: expect.not.toHaveHeader('Authorization'),
          });
        });

        it('should pass when the expected header is missing regardless that there is another header that contain the expected header', async () => {
          const response = await testClient.post(`${apiUrl}/headers`, {
            'X-Custom-Header': 'some value',
          });

          expect(response).not.toHaveHeader('X-Custom');

          expect({ response }).toEqual({
            response: expect.not.toHaveHeader('X-Custom'),
          });
        });

        it('should pass when the expected header is missing regardless that there is another header that is substring of the expected header', async () => {
          const response = await testClient.post(`${apiUrl}/headers`, {
            'X-Custom': 'some value',
          });

          expect(response).not.toHaveHeader('X-Custom-Header');

          expect({ response }).toEqual({
            response: expect.not.toHaveHeader('X-Custom-Header'),
          });
        });

        it('should pass when the expected header is missing when expected header value is provided', async () => {
          const response = await testClient.post(`${apiUrl}/headers`, {
            'x-custom-header': 'some value',
            Accept: 'application/json',
          });

          expect(response).not.toHaveHeader('Authorization', 'hello');
          expect({ response }).toEqual({
            response: expect.not.toHaveHeader('Authorization', 'hello'),
          });
        });

        it('should pass when the expected header exist but the expected value does not match', async () => {
          const response = await testClient.post(`${apiUrl}/headers`, {
            'x-custom-header': 'some value',
            Accept: 'application/json',
          });

          expect(response).not.toHaveHeader('x-custom-header', 'hello');
          expect({ response }).toEqual({
            response: expect.not.toHaveHeader('x-custom-header', 'hello'),
          });
        });

        it('should pass when the expected header exist but the expected value does not match regardless that the value match another header value', async () => {
          const response = await testClient.post(`${apiUrl}/headers`, {
            'x-custom-header': 'some value',
            Accept: 'application/json',
          });

          expect(response).not.toHaveHeader('x-custom-header', 'application/json');
          expect({ response }).toEqual({
            response: expect.not.toHaveHeader('x-custom-header', 'application/json'),
          });
        });

        it('should pass when the expected header exist and passing asymmetric matcher as the expected value that does not match', async () => {
          const response = await testClient.post(`${apiUrl}/headers`, {
            'x-custom-header': 'some value',
            Accept: 'application/json',
          });

          expect(response).not.toHaveHeader('x-custom-header', expect.any(Number));
          expect({ response }).toEqual({
            response: expect.not.toHaveHeader('x-custom-header', expect.any(Number)),
          });
        });

        it('should fail when the expected header is present and not providing expected header value', async (t) => {
          // Should have the assert snapshot assertion
          t.plan(2);

          const response = await testClient.post(`${apiUrl}/headers`, {
            'x-custom-header': 'some value',
            Accept: 'application/json',
          });

          try {
            expect(response).not.toHaveHeader('x-custom-header');
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.not.toHaveHeader('x-custom-header'),
            }),
          ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);

          try {
            expect(response).not.toHaveHeader('Accept');
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.not.toHaveHeader('Accept'),
            }),
          ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
        });

        it('should fail when the expected header is present and the value is provided and match', async (t) => {
          // Should have the assert snapshot assertion
          t.plan(2);

          const response = await testClient.post(`${apiUrl}/headers`, {
            'x-custom-header': 'some value',
            Accept: 'application/json',
          });

          try {
            expect(response).not.toHaveHeader('x-custom-header', 'some value');
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.not.toHaveHeader('x-custom-header', 'some value'),
            }),
          ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);

          try {
            expect(response).not.toHaveHeader('Accept', 'application/json');
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.not.toHaveHeader('Accept', 'application/json'),
            }),
          ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
        });

        it('should fail when the expected header is present and the expected value is matching asymmetric matcher', async (t) => {
          // Should have the assert snapshot assertion
          t.plan(4);

          const response = await testClient.post(`${apiUrl}/headers`, {
            'x-custom-header': 'some value',
            Accept: 'application/json',
          });

          try {
            expect(response).not.toHaveHeader('x-custom-header', expect.any(String));
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.not.toHaveHeader('x-custom-header', expect.any(String)),
            }),
          ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);

          try {
            expect(response).not.toHaveHeader('x-custom-header', expect.stringContaining('some'));
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.not.toHaveHeader('x-custom-header', expect.stringContaining('some')),
            }),
          ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);

          try {
            expect(response).not.toHaveHeader('accept', expect.any(String));
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.not.toHaveHeader('accept', expect.any(String)),
            }),
          ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);

          try {
            expect(response).not.toHaveHeader('accept', expect.stringContaining('application'));
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.not.toHaveHeader('accept', expect.stringContaining('application')),
            }),
          ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
        });

        it('should fail when the expected header is present even when the header case is not the same (case insensitive)', async (t) => {
          // Should have the assert snapshot assertion
          t.plan(3);

          const response = await testClient.post(`${apiUrl}/headers`, {
            'x-cUsToM-header': 'some value',
          });

          try {
            expect(response).not.toHaveHeader('x-CuStOm-heAdEr');
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.not.toHaveHeader('x-CuStOm-heAdEr'),
            }),
          ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);

          try {
            expect(response).not.toHaveHeader('X-CUSTOM-HEADER');
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.not.toHaveHeader('X-CUSTOM-HEADER'),
            }),
          ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);

          try {
            expect(response).not.toHaveHeader('x-custom-header');
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.not.toHaveHeader('x-custom-header'),
            }),
          ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
        });

        it('should fail when the expected header is present even when the header case is not the same (case insensitive) and expected value is provided', async (t) => {
          // Should have the assert snapshot assertion
          t.plan(3);

          const response = await testClient.post(`${apiUrl}/headers`, {
            'x-cUsToM-header': 'some value',
          });
          try {
            expect(response).not.toHaveHeader('x-CuStOm-heAdEr', 'some value');
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.not.toHaveHeader('x-CuStOm-heAdEr', 'some value'),
            }),
          ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);

          try {
            expect(response).not.toHaveHeader('X-CUSTOM-HEADER', 'some value');
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.not.toHaveHeader('X-CUSTOM-HEADER', 'some value'),
            }),
          ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);

          try {
            expect(response).not.toHaveHeader('x-custom-header', 'some value');
          } catch (e) {
            t.assert.snapshot(e);
          }

          expect(() =>
            expect({ response }).toEqual({
              response: expect.not.toHaveHeader('x-custom-header', 'some value'),
            }),
          ).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
        });
      });
    });
  }
});
