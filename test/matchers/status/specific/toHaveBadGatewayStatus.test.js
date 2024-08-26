const { matchers } = require('../../../../src');
const { toHaveBadGatewayStatus } = matchers;
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');
const { shouldTestAsymmetricMatcherErrorsSnapshot } = require('../../../helpers/can-test-snapshot');

expect.extend({ toHaveBadGatewayStatus });

describe('(.not).toHaveBadGatewayStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveBadGatewayStatus', () => {
        test('passes when response has status code BAD_GATEWAY (502)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 502,
          });

          expect(response).toHaveBadGatewayStatus();
          expect({ response }).toEqual({
            response: expect.toHaveBadGatewayStatus(),
          });
        });

        test(`fails when response have other status code`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 200,
          });

          try {
            expect(response).toHaveBadGatewayStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.toHaveBadGatewayStatus(),
            });
          }).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
        });
      });

      describe('.not.toHaveBadGatewayStatus', () => {
        test('passes when got other status code', async () => {
          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          expect(response).not.toHaveBadGatewayStatus();

          expect({ response }).toEqual({
            response: expect.not.toHaveBadGatewayStatus(),
          });
        });

        test(`fails when response have status code 502`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 502,
          });

          try {
            expect(response).not.toHaveBadGatewayStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveBadGatewayStatus(),
            });
          }).toThrowError(shouldTestAsymmetricMatcherErrorsSnapshot(testClient) ? JestAssertionError : Error);
        });
      });
    });
  }
});
