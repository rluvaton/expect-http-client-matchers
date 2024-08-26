const { matchers } = require('../../../../src');
const { toHaveRequestHeaderFieldsTooLargeStatus } = matchers;
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');
const { shouldTestAsymmetricMatcherErrorsSnapshot } = require('../../../helpers/can-test-snapshot');

expect.extend({ toHaveRequestHeaderFieldsTooLargeStatus });

describe('(.not).toHaveRequestHeaderFieldsTooLargeStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveRequestHeaderFieldsTooLargeStatus', () => {
        test('passes when response has status code REQUEST_HEADER_FIELDS_TOO_LARGE (431)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 431,
          });

          expect(response).toHaveRequestHeaderFieldsTooLargeStatus();
          expect({ response }).toEqual({
            response: expect.toHaveRequestHeaderFieldsTooLargeStatus(),
          });
        });

        test(`fails when response have other status code`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 200,
          });

          try {
            expect(response).toHaveRequestHeaderFieldsTooLargeStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.toHaveRequestHeaderFieldsTooLargeStatus(),
            });
          }).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
        });
      });

      describe('.not.toHaveRequestHeaderFieldsTooLargeStatus', () => {
        test('passes when got other status code', async () => {
          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          expect(response).not.toHaveRequestHeaderFieldsTooLargeStatus();

          expect({ response }).toEqual({
            response: expect.not.toHaveRequestHeaderFieldsTooLargeStatus(),
          });
        });

        test(`fails when response have status code 431`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 431,
          });

          try {
            expect(response).not.toHaveRequestHeaderFieldsTooLargeStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveRequestHeaderFieldsTooLargeStatus(),
            });
          }).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
        });
      });
    });
  }
});
