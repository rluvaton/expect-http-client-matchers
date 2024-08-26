const { matchers } = require('../../../../src');
const { toHaveUnsupportedMediaTypeStatus } = matchers;
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');
const { shouldTestAsymmetricMatcherErrorsSnapshot } = require('../../../helpers/can-test-snapshot');

expect.extend({ toHaveUnsupportedMediaTypeStatus });

describe('(.not).toHaveUnsupportedMediaTypeStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveUnsupportedMediaTypeStatus', () => {
        test('passes when response has status code UNSUPPORTED_MEDIA_TYPE (415)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 415,
          });

          expect(response).toHaveUnsupportedMediaTypeStatus();
          expect({ response }).toEqual({
            response: expect.toHaveUnsupportedMediaTypeStatus(),
          });
        });

        test(`fails when response have other status code`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 200,
          });

          try {
            expect(response).toHaveUnsupportedMediaTypeStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.toHaveUnsupportedMediaTypeStatus(),
            });
          }).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
        });
      });

      describe('.not.toHaveUnsupportedMediaTypeStatus', () => {
        test('passes when got other status code', async () => {
          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          expect(response).not.toHaveUnsupportedMediaTypeStatus();

          expect({ response }).toEqual({
            response: expect.not.toHaveUnsupportedMediaTypeStatus(),
          });
        });

        test(`fails when response have status code 415`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 415,
          });

          try {
            expect(response).not.toHaveUnsupportedMediaTypeStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveUnsupportedMediaTypeStatus(),
            });
          }).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
        });
      });
    });
  }
});
