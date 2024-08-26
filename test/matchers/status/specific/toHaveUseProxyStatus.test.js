const { matchers } = require('../../../../src');
const { toHaveUseProxyStatus } = matchers;
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');
const { shouldTestAsymmetricMatcherErrorsSnapshot } = require('../../../helpers/can-test-snapshot');

expect.extend({ toHaveUseProxyStatus });

describe('(.not).toHaveUseProxyStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveUseProxyStatus', () => {
        test('passes when response has status code USE_PROXY (305)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 305,
          });

          expect(response).toHaveUseProxyStatus();
          expect({ response }).toEqual({
            response: expect.toHaveUseProxyStatus(),
          });
        });

        test(`fails when response have other status code`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 200,
          });

          try {
            expect(response).toHaveUseProxyStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.toHaveUseProxyStatus(),
            });
          }).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
        });
      });

      describe('.not.toHaveUseProxyStatus', () => {
        test('passes when got other status code', async () => {
          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          expect(response).not.toHaveUseProxyStatus();

          expect({ response }).toEqual({
            response: expect.not.toHaveUseProxyStatus(),
          });
        });

        test(`fails when response have status code 305`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 305,
          });

          try {
            expect(response).not.toHaveUseProxyStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveUseProxyStatus(),
            });
          }).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
        });
      });
    });
  }
});
