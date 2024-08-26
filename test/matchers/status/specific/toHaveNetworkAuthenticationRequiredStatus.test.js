const { matchers } = require('../../../../src');
const { toHaveNetworkAuthenticationRequiredStatus } = matchers;
const { describe, test, before } = require('node:test');
const { buildServer } = require('../../../helpers/server-helper.js');
const { expect, JestAssertionError } = require('expect');
const { getServerUrl } = require('../../../helpers/server-helper');
const { testClients } = require('../../../helpers/supported-clients');

expect.extend({ toHaveNetworkAuthenticationRequiredStatus });

describe('(.not).toHaveNetworkAuthenticationRequiredStatus', () => {
  /**
   * @type {string}
   */
  let apiUrl = getServerUrl();

  before(async () => {
    await buildServer();
  });

  for (const testClient of testClients) {
    describe(`using ${testClient.name}`, () => {
      describe('.toHaveNetworkAuthenticationRequiredStatus', () => {
        test('passes when response has status code NETWORK_AUTHENTICATION_REQUIRED (511)', async () => {
          const response = await testClient.post(`${apiUrl}/status`, {
            status: 511,
          });

          expect(response).toHaveNetworkAuthenticationRequiredStatus();
          expect({ response }).toEqual({
            response: expect.toHaveNetworkAuthenticationRequiredStatus(),
          });
        });

        test(`fails when response have other status code`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 200,
          });

          try {
            expect(response).toHaveNetworkAuthenticationRequiredStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.toHaveNetworkAuthenticationRequiredStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });

      describe('.not.toHaveNetworkAuthenticationRequiredStatus', () => {
        test('passes when got other status code', async () => {
          const response = await testClient.post(
            `${apiUrl}/status`,
            {
              status: 200,
            },
            {},
          );

          expect(response).not.toHaveNetworkAuthenticationRequiredStatus();

          expect({ response }).toEqual({
            response: expect.not.toHaveNetworkAuthenticationRequiredStatus(),
          });
        });

        test(`fails when response have status code 511`, async (t) => {
          // Should have the assert snapshot assertion
          t.plan(1);

          const response = await testClient.post(`${apiUrl}/status`, {
            status: 511,
          });

          try {
            expect(response).not.toHaveNetworkAuthenticationRequiredStatus();
          } catch (e) {
            t.assert.snapshot(e);
          }

          // Not using snapshot in the test as the error will contain the entire response
          // plus dynamic values
          expect(() => {
            expect({ response }).toEqual({
              response: expect.not.toHaveNetworkAuthenticationRequiredStatus(),
            });
          }).toThrowError(JestAssertionError);
        });
      });
    });
  }
});
